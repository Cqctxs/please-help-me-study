import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ReactMarkdown from "react-markdown";

const SolutionMenu = (solution, setSolution) => {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const rawText = document.createElement("div");
    rawText.innerHTML = content;
    const text = rawText.textContent || rawText.innerText;

    console.log(text);

    // Send the solution to the server
    fetch("34.31.69.199/api/problem/answer", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userResponse: text, solution: solution }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.response);
      })
      .catch((error) => {
        // Handle the error
      });
  };

  return (
    <div>
      <Editor
        apiKey="fm5ufxn5p7tojmfbzvqc6fxs62argkafj4p5cyb26ze8y5up"
        init={{
          selector: "textarea",
          resize: false,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
        initialValue="Enter your solution here."
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      {submitted === true && response !== "" ? (
        <div>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default SolutionMenu;
