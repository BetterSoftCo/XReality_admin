import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            key={'viewport'}
          />
          <meta
            name="description"
            content="A pretty cool country selector for React!"
            key={'description'}
          />
          <meta
            name="keywords"
            content="React, country, forms, tailwind"
            key={'keywords'}
          />
          <meta name="robots" content="all" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument
