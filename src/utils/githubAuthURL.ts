export function getGitHubAuthorizeUrl(from?: string) {
    const rootURl = "https://github.com/login/oauth/authorize";
  
    const options = {
      client_id: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID as string,
      redirect_uri: `${window.location.origin}${import.meta.env.VITE_BASENAME}/auth/github/callback`,
    //   scope: "user:email",
    //   state: from,
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootURl}?${qs.toString()}`;
  }