// export async function apiFetch(url: string, options: RequestInit = {}) {
//   let token = localStorage.getItem("access_token");

//   const makeRequest = (accessToken: string) => {
//     return fetch(url, {
//       ...options,
//       headers: {
//         ...(options.headers || {}),
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//   };

//   let response = await makeRequest(token || "");

//   if (response.status === 401) {
//     const refreshToken = localStorage.getItem("refresh_token");
   
//     if (refreshToken) {
//       const refreshResponse = await fetch("http://127.0.0.1:8000/refresh", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refresh_token: refreshToken }),
//       });

//       if (refreshResponse.ok) {
//         const data = await refreshResponse.json();
//         localStorage.setItem("access_token", data.access_token);
//         localStorage.setItem("refresh_token", data.refresh_token);
//         response = await makeRequest(data.access_token);
//       } else {
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         window.location.href = "/login";
//       }
//     } else {
//       window.location.href = "/login";
//     }
//   }

//   return response;
// }
export async function apiFetch(url: string, options: RequestInit = {}) {
  let token = localStorage.getItem("access_token");

  const makeRequest = (accessToken: string) => {
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        authorization: `Bearer ${accessToken}`,
      },
    });
  };

  let response = await makeRequest(token || "");

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");
    
    if (refreshToken) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const refreshResponse = await fetch(`${baseUrl}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        response = await makeRequest(data.access_token);
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }

  return response;
}