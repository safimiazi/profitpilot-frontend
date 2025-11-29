// // app/facebook-callback/page.js
// 'use client';
// import { useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function FacebookCallbackPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const handleCallback = async () => {
//       const code = searchParams.get('code');
//       const error = searchParams.get('error');

//       console.log('🔗 Callback received:', { code, error });

//       if (error) {
//         console.error('❌ Facebook OAuth Error:', error);
//         alert(`Facebook connection failed: ${error}`);
//         router.push('/');
//         return;
//       }

//       if (code) {
//         try {
//           console.log('🔑 Processing code...');

//           // আপনার token exchange logic here
//           const FACEBOOK_APP_ID = '825021250164126';
//           const FACEBOOK_APP_SECRET = '42a4f00dcce15e5fa1f7fcb558bf3871';
//           const REDIRECT_URI = 'http://localhost:3000/facebook-callback';

//           const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`;

//           const tokenResponse = await fetch(tokenUrl);
//           const tokenData = await tokenResponse.json();

//           if (!tokenResponse.ok) {
//             throw new Error(tokenData.error.message);
//           }

//           const accessToken = tokenData.access_token;

//           // Get pages and save data...
//           const pagesUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`;
//           const pagesResponse = await fetch(pagesUrl);
//           const pagesData = await pagesResponse.json();
// console.log('📄 Pages data:', pagesData);
//           // Save to your backend
//           await fetch('http://localhost:3006/facebook/oauth/save-data', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               accessToken,
//               pages: pagesData.data
//             })
//           });

//           router.push('/?facebook_connected=true');

//         } catch (error) {
//           console.error('❌ Error:', error);
//           alert(`Connection failed: ${error.message}`);
//           router.push('/');
//         }
//       }
//     };

//     handleCallback();
//   }, [router, searchParams]);

//   return (
//     <div style={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       height: '100vh',
//       flexDirection: 'column'
//     }}>
//       <h2>Connecting Facebook...</h2>
//       <p>Please wait while we connect your account.</p>
//     </div>
//   );
// }
// app/facebook-callback/page.js
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FacebookCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const error = searchParams.get('error');

            console.log('🔗 Callback received:', { code, error });

            if (error) {
                console.error('❌ Facebook OAuth Error:', error);
                alert(`Facebook connection failed: ${error}`);
                router.push('/');
                return;
            }

            if (code) {
                try {
                    console.log('🔑 Processing code...');

                    // Token exchange
                    const FACEBOOK_APP_ID = '825021250164126';
                    const FACEBOOK_APP_SECRET = '42a4f00dcce15e5fa1f7fcb558bf3871';
                    const REDIRECT_URI = 'http://localhost:3000/facebook-callback';

                    const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`;

                    const tokenResponse = await fetch(tokenUrl);
                    const tokenData = await tokenResponse.json();

                    if (!tokenResponse.ok) {
                        throw new Error(tokenData.error.message);
                    }

                    const userAccessToken = tokenData.access_token;
                    console.log('✅ User access token received');

                    // Get pages data
                    // Get pages and save data...
                    const pagesUrl = `https://graph.facebook.com/v19.0/me/accounts?access_token=${userAccessToken}`;
                    const pagesResponse = await fetch(pagesUrl);
                    const pagesData = await pagesResponse.json();

                    console.log('📄 Pages data:', pagesData);

                    if (!pagesData.data || pagesData.data.length === 0) {
                        throw new Error('No Facebook pages found for this account');
                    }

                    // ✅ প্রতিটি page এর জন্য আলাদা আলাদা request send করুন
                    const savePromises = pagesData.data.map(async (page) => {
                        const pageData = {
                            pageId: page.id,
                            pageName: page.name,
                            accessToken: page.access_token,
                            verifyToken: 'your_verify_token_here', // আপনি custom verify token generate করুন
                            category: page.category || 'Business',
                            email: page.email || '',
                            address: page.location ? `${page.location.street || ''} ${page.location.city || ''} ${page.location.country || ''}`.trim() : '',
                            phone: page.phone || '',
                            moreInfo: `Page category: ${page.category}`
                        };

                        console.log('📤 Saving page:', pageData);

                        return fetch('http://localhost:3006/facebook/pages', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGlidWxsYW1pYXppMUBnbWFpbC5jb20iLCJzdWIiOiI2OTI4OGZhM2E1ZjZiNDNiMDY0MDU5YWYiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NDQwOTYzNiwiZXhwIjoxNzY0NDk2MDM2fQ.OTEGDsDNnx9xVwFP2oJrWSdKVKnTrMSy956il1v08HA` // আপনার user token
                            },
                            body: JSON.stringify(pageData)
                        });
                    });

                    // ✅ সব pages save করার await করুন
                    const responses = await Promise.all(savePromises);

                    // ✅ Check if all requests were successful
                    const allSuccessful = responses.every(response => response.ok);

                    if (allSuccessful) {
                        console.log('🎉 All pages saved successfully!');
                        alert(`Successfully connected ${pagesData.data.length} Facebook pages!`);
                        router.push('/?facebook_connected=true');
                    } else {
                        const errorResults = await Promise.all(
                            responses.map(async (response, index) => {
                                if (!response.ok) {
                                    const error = await response.json();
                                    return `Page ${pagesData.data[index].name}: ${error.message}`;
                                }
                                return null;
                            })
                        );

                        const errors = errorResults.filter(error => error !== null);
                        throw new Error(`Some pages failed to save: ${errors.join(', ')}`);
                    }

                } catch (error) {
                    console.error('❌ Error:', error);
                    alert(`Connection failed: ${error.message}`);
                    router.push('/');
                }
            }
        };

        handleCallback();
    }, [router, searchParams]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <h2>Connecting Facebook Pages...</h2>
            <p>Please wait while we connect your Facebook pages.</p>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #1877f2',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginTop: '20px'
            }}></div>
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}