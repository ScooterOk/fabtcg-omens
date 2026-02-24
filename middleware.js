export const config = {
  matcher: '/(.*)',
};

export default function middleware(request) {
  const authorizationHeader = request.headers.get('authorization');

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).split(':');

    if (user === 'omens' && password === 'auM?b56L!w9') {
      return new Response(null, { headers: { 'x-middleware-next': '1' } });
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}