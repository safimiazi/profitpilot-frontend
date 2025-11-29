
'use client';
import { useState } from 'react';

export default function FacebookConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageAccessToken, setPageAccessToken] = useState('EAALuWjqMVZA4BQDOBnbcznYJmaEVwZBw6dRZB81CxZC4D9YGGzHzrEGUA61Gglo177qz5W1DgEifYZAPuSgbcmDOxa32o6SPDfR8LBMEmY1PyHlwE9qeEEKFpt00LTEvG4RJNGi6cvWdlFiBufIgVjzBMkot5g4GD0s3Yo3eF8qPI2P3P7e5RLypxVta6VBQgFqnNn5IZD');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Get conversations with PROPER fields for message text
  const getConversationsList = async () => {
    setLoading(true);
    try {
      const url = `https://graph.facebook.com/v19.0/me/conversations`;
      
      // ✅ CORRECT fields - messages.limit(1) add করুন
      const params = new URLSearchParams({
        access_token: pageAccessToken,
        fields: 'id,participants,messages.limit(1){message,from,created_time}',
        limit: '20'
      });

      console.log('📞 Fetching conversations...');
      
      const response = await fetch(`${url}?${params}`);
      const data = await response.json();
      
      console.log('📬 Full Conversations response:', data);

      if (data.error) {
        throw new Error(data.error.message);
      }

      // ✅ Better conversation processing
      const formattedConversations = data.data.map(conv => {
        const user = conv.participants?.data?.find(p => p.id !== 'me');
        const lastMessage = conv.messages?.data?.[0];
        
        // ✅ Check if message has actual text content
        const messageText = lastMessage?.message || 'No text message';
        const hasMessageContent = messageText && messageText !== 'No text message' && messageText.trim() !== '';
        
        console.log(`User: ${user?.name}, Message: "${messageText}", Has Content: ${hasMessageContent}`);
        
        return {
          conversationId: conv.id,
          userId: user?.id,
          userName: user?.name || 'Unknown User',
          lastMessage: messageText,
          lastMessageTime: lastMessage?.created_time || new Date().toISOString(),
          sender: lastMessage?.from?.name || 'Unknown',
          hasMessageContent: hasMessageContent,
          // Check if user is within 24-hour window
          canMessage: lastMessage ? isWithin24Hours(lastMessage.created_time) : false
        };
      }).filter(conv => conv.userId && conv.userName !== 'Unknown User');

      setConversations(formattedConversations);
      console.log(`✅ Found ${formattedConversations.length} conversations with users`);

    } catch (error) {
      console.error('❌ Conversations Error:', error);
      alert('Error fetching conversations: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Alternative: Get conversations with messages separately
  const getConversationsWithMessages = async () => {
    setLoading(true);
    try {
      // First get conversations
      const convUrl = `https://graph.facebook.com/v19.0/me/conversations`;
      const convParams = new URLSearchParams({
        access_token: pageAccessToken,
        fields: 'id,participants,snippet,updated_time,message_count',
        limit: '20'
      });

      console.log('📞 Fetching conversations list...');
      
      const convResponse = await fetch(`${convUrl}?${convParams}`);
      const convData = await convResponse.json();
      
      console.log('📬 Conversations list:', convData);

      if (convData.error) {
        throw new Error(convData.error.message);
      }

      // Process each conversation to get messages
      const conversationsWithMessages = await Promise.all(
        convData.data.map(async (conv) => {
          try {
            const user = conv.participants?.data?.find(p => p.id !== 'me');
            if (!user) return null;

            // Get messages for this conversation
            const messagesUrl = `https://graph.facebook.com/v19.0/${conv.id}/messages`;
            const messagesParams = new URLSearchParams({
              access_token: pageAccessToken,
              fields: 'message,from,created_time',
              limit: '1'
            });

            const messagesResponse = await fetch(`${messagesUrl}?${messagesParams}`);
            const messagesData = await messagesResponse.json();
            
            const lastMessage = messagesData.data?.[0];
            const messageText = lastMessage?.message || conv.snippet || 'No message content';
            
            return {
              conversationId: conv.id,
              userId: user.id,
              userName: user.name,
              lastMessage: messageText,
              lastMessageTime: lastMessage?.created_time || conv.updated_time,
              sender: lastMessage?.from?.name || 'Unknown',
              hasMessageContent: messageText && messageText !== 'No message content',
              canMessage: lastMessage ? isWithin24Hours(lastMessage.created_time) : isWithin24Hours(conv.updated_time)
            };
          } catch (error) {
            console.error(`Error getting messages for conversation ${conv.id}:`, error);
            return null;
          }
        })
      );

      const validConversations = conversationsWithMessages.filter(conv => conv !== null);
      setConversations(validConversations);
      console.log(`✅ Processed ${validConversations.length} conversations`);

    } catch (error) {
      console.error('❌ Conversations Error:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check if message is within 24 hours
  const isWithin24Hours = (messageTime) => {
    try {
      const messageDate = new Date(messageTime);
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return messageDate > twentyFourHoursAgo;
    } catch (error) {
      return false;
    }
  };

  // ✅ Send message with better error handling
  const sendMessage = async (userId = recipientId, customMessage = message) => {
    if (!userId || !customMessage.trim()) {
      alert('Please enter recipient ID and message');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me/messages`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipient: { id: userId },
            message: { text: customMessage },
            access_token: pageAccessToken
          })
        }
      );
      
      const data = await response.json();
      setResult(data);
      
      if (data.error) {
        console.error('❌ Message sending failed:', data.error);
        
        // Handle specific errors
        if (data.error.code === 10) {
          alert('❌ User is outside 24-hour messaging window. Use template messages instead.');
        } else if (data.error.code === 100) {
          alert('❌ Invalid user ID or user not found');
        } else {
          alert('❌ Failed to send message: ' + data.error.message);
        }
      } else {
        console.log('✅ Message sent successfully:', data);
        alert('✅ Message sent successfully!');
        setMessage('');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('❌ Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Quick message to user from conversations
  const quickMessage = (user) => {
    setSelectedUser(user);
    setRecipientId(user.userId);
    const defaultMessage = `Hello ${user.userName}! This is a test message from Profit Pilot.`;
    setMessage(defaultMessage);
  };

  const handleConnectFacebook = () => {
    setIsLoading(true);
    const appId = '825021250164126';
    const redirectUri = 'http://localhost:3000/facebook-callback';
    const scope = 'public_profile,pages_show_list,business_management,pages_messaging,pages_manage_metadata';
    
    const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
    
    window.location.href = facebookAuthUrl;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h3 style={{ textAlign: 'center', color: '#1877f2', marginBottom: '30px' }}>Facebook Messenger Test</h3>
      
      {/* Connect Button */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          onClick={handleConnectFacebook}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? 'Redirecting...' : 'Connect Facebook'}
        </button>
      </div>

      {/* Conversations Section */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4 style={{ color: '#333', margin: 0 }}>Conversations ({conversations.length})</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={getConversationsList}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#8e44ad',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {loading ? 'Loading...' : 'Quick Load'}
            </button>
            <button 
              onClick={getConversationsWithMessages}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {loading ? 'Loading...' : 'Detailed Load'}
            </button>
          </div>
        </div>

        {conversations.length > 0 ? (
          <div style={{ 
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            maxHeight: '500px',
            overflowY: 'auto',
            backgroundColor: '#fafafa'
          }}>
            {conversations.map((conv, index) => (
              <div 
                key={index}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  border: '2px solid',
                  borderColor: conv.canMessage ? '#27ae60' : '#e74c3c',
                  borderRadius: '8px',
                  backgroundColor: conv.canMessage ? '#f0fff0' : '#fff0f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => quickMessage(conv)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '16px', color: '#2c3e50' }}>{conv.userName}</strong>
                      {!conv.hasMessageContent && (
                        <span style={{ 
                          marginLeft: '10px',
                          padding: '2px 6px',
                          backgroundColor: '#f39c12',
                          color: 'white',
                          borderRadius: '10px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          No Text
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#7f8c8d', marginBottom: '6px' }}>
                      ID: <code style={{ backgroundColor: '#ecf0f1', padding: '2px 4px', borderRadius: '3px' }}>{conv.userId}</code>
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      marginTop: '8px', 
                      color: conv.hasMessageContent ? '#2c3e50' : '#95a5a6',
                      fontStyle: conv.hasMessageContent ? 'normal' : 'italic',
                      backgroundColor: conv.hasMessageContent ? '#ffffff' : 'transparent',
                      padding: conv.hasMessageContent ? '8px' : '0',
                      borderRadius: conv.hasMessageContent ? '4px' : '0',
                      border: conv.hasMessageContent ? '1px solid #e0e0e0' : 'none'
                    }}>
                      {conv.hasMessageContent ? (
                        <>
                          <strong>Message:</strong> "
                          {conv.lastMessage.length > 100 
                            ? conv.lastMessage.substring(0, 100) + '...' 
                            : conv.lastMessage
                          }"
                        </>
                      ) : (
                        `💬 ${conv.lastMessage}`
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#95a5a6', marginTop: '6px' }}>
                      📅 {new Date(conv.lastMessageTime).toLocaleString()} 
                      {conv.sender && ` • 👤 From: ${conv.sender}`}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '6px 12px', 
                    backgroundColor: conv.canMessage ? '#27ae60' : '#e74c3c',
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    minWidth: '80px'
                  }}>
                    {conv.canMessage ? '✅ Can Message' : '⏰ 24h+ Old'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: '8px',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h4 style={{ color: '#495057', marginBottom: '8px' }}>No Conversations Found</h4>
            <p style={{ marginBottom: '20px' }}>
              {loading ? 'Loading conversations...' : 'Click "Quick Load" or "Detailed Load" to fetch conversations from your Facebook Page.'}
            </p>
            <div style={{ fontSize: '14px', color: '#868e96' }}>
              <strong>Tip:</strong> Make sure your page has active conversations with users.
            </div>
          </div>
        )}
      </div>

      {/* Message Sending Section */}
      <div style={{ 
        border: '2px solid #e9ecef',
        borderRadius: '12px',
        padding: '25px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '20px', borderBottom: '2px solid #f8f9fa', paddingBottom: '10px' }}>
          Send Message
        </h4>
        
        {selectedUser && (
          <div style={{ 
            padding: '15px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            marginBottom: '20px',
            borderLeft: '4px solid #2196f3'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#1976d2' }}>Selected User:</strong> 
                <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{selectedUser.userName}</span>
                <div style={{ fontSize: '12px', color: '#546e7a', marginTop: '4px' }}>
                  ID: {selectedUser.userId}
                </div>
              </div>
              {!selectedUser.canMessage && (
                <div style={{ 
                  padding: '4px 8px',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  ⚠️ 24h+ Old
                </div>
              )}
            </div>
            {!selectedUser.canMessage && (
              <div style={{ color: '#e65100', fontSize: '13px', marginTop: '8px', fontWeight: '500' }}>
                ⚠️ This user messaged more than 24 hours ago. Regular messages may fail. Consider using approved templates.
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
            Recipient Facebook ID:
          </label>
          <input
            type="text"
            placeholder="Enter Recipient ID manually or click on a user above"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            style={{ 
              padding: '12px', 
              width: '100%', 
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '14px',
              color: '#343a40',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#495057' }}>
            Message Text:
          </label>
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ 
              padding: '12px', 
              width: '100%', 
              height: '100px',
              border: '2px solid #e9ecef',
              borderRadius: '6px',
              fontSize: '14px',
                            color: '#343a40',

              resize: 'vertical',
              transition: 'border-color 0.2s ease',
              fontFamily: 'Arial, sans-serif'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />
        </div>

        <button
          onClick={() => sendMessage()}
          disabled={loading}
          style={{
            padding: '14px 24px',
            backgroundColor: loading ? '#95a5a6' : '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            width: '100%',
            fontWeight: 'bold',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (!loading) e.target.style.backgroundColor = '#219a52';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.target.style.backgroundColor = '#27ae60';
          }}
        >
          {loading ? '📤 Sending Message...' : '🚀 Send Message'}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div style={{ 
          marginTop: '25px',
          padding: '20px',
          backgroundColor: result.error ? '#ffebee' : '#e8f5e8',
          border: `2px solid ${result.error ? '#ffcdd2' : '#c8e6c9'}`,
          borderRadius: '8px'
        }}>
          <h4 style={{ 
            color: result.error ? '#c62828' : '#2e7d32',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {result.error ? '❌ Error Sending Message' : '✅ Message Sent Successfully'}
          </h4>
          <pre style={{ 
            fontSize: '12px', 
            overflow: 'auto',
            backgroundColor: '#2d3748',
            color: 'white',
            padding: '15px',
            borderRadius: '6px',
            maxHeight: '300px'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* Information Section */}
      <div style={{ 
        marginTop: '25px',
        padding: '20px',
        backgroundColor: '#fff3cd',
        border: '2px solid #ffeaa7',
        borderRadius: '8px'
      }}>
        <h4 style={{ color: '#856404', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💡 Important Information
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <strong style={{ color: '#27ae60' }}>✅ Green Users:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '14px', color: '#555' }}>
              <li>Can receive messages (within 24 hours)</li>
              <li>Clicked your page or sent message recently</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#e74c3c' }}>⏰ Red Users:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '14px', color: '#555' }}>
              <li>Cannot receive regular messages</li>
              <li>Last interaction was 24+ hours ago</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#f39c12' }}>🟡 No Text Indicator:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '14px', color: '#555' }}>
              <li>Message contains no readable text</li>
              <li>Might be image, sticker, or other content</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '15px', fontSize: '13px', color: '#856404', padding: '10px', backgroundColor: '#fffdf6', borderRadius: '4px' }}>
          <strong>Pro Tip:</strong> Use "Detailed Load" for more accurate message content. Click on any user to auto-fill their details.
        </div>
      </div>
    </div>
  );
}