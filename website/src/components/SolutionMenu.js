import React from 'react'

const SolutionMenu = () => {
  return (
    <div>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>
            <script>
            tinymce.init({
                selector: '#mytextarea'
            });
            </script>
        </head>

        <body>
            <h1>TinyMCE Quick Start Guide</h1>
            <form method="post">
            <textarea id="mytextarea">Hello, World!</textarea>
            </form>
        </body>
    </div>
  )
}

export default SolutionMenu