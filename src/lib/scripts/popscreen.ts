export function popScreen(window: Window, { name, size }, { protocol, host, port }) {
	const win = window.open(
		'',
		'',
		`
      width=${size.width},
      height=${size.height},
      toolbar=no,
      menubar=no,
      top=20px,
      left=20px
    `
	);

	win.document.write(/* html */ `
    <html>
      <head>
        <title>
          ${name} (${size.width}x${size.height})
        </title>
        <style>
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          iframe {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>

      <body>
        <iframe
          title="mobile"
          src="${protocol}://${host}${port ? ':' : ''}${port}"
          frameborder="0"
        ></iframe>
      </body>

    </html>
  `);
}
