const isDev = import.meta.env.PROD != true;

export const resProxy = async (c) => {
    const { scope, name } = c.req.param();

    const host = c.req.header('host');
    const protocol = c.req.url.indexOf('https') == 0 ? 'https' : 'http';
    const url = `${protocol}://${host}/site/${scope}/${name}`;

    console.log(url)

    try {
        const r = await fetch(url);
        return new Response(r.body, {
            status: 200,
            headers: {
                'Content-type': r.headers.get('Content-type'),
                //'Cache-Control': 'public, max-age=14400',
            }
        });
    } catch (e) {
        return c.json({ error: e.message })
    }
}

