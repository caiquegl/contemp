import Document, {
  Html,
  Main,
  NextScript,
  Head,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";


export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <title>Contemp</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" async src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/e038acad-48ed-4f16-8e46-7c675b617c92-loader.js" ></script>
          
          <script dangerouslySetInnerHTML={{
            __html: `
              !function (t, e, c, n) {
                var s = e.createElement(c);
                s.async = 1, s.src = 'https://scripts.claspo.io/scripts/' + n + '.js';
                var r = e.scripts[0];
                r.parentNode.insertBefore(s, r);
                var f = function () {
                    f.c(arguments);
                };
                f.q = [];
                f.c = function () {
                    f.q.push(arguments);
                };
                t['claspo'] = t['claspo'] || f;
              }(window, document, 'script', 'D8ABC933B8D7450EB4285DE2F58D1A8D');

              
              claspo('init');
            `,
          }} />
        </body>
      </Html>
    );
  }
}
