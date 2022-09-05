import React, { Fragment, useState, useRef, useMemo } from "react";
import { getUsername } from "../../helper";
import styles from "./Home.module.css";
import JoditEditor from "jodit-react";

const Home = () => {
  const editor = useRef(null);
  const subject = useRef(null);
  const to = useRef(null);
  let [content, setContent] = useState("");

  const user = localStorage.getItem("email");
  const username = getUsername(user);


  const formHandler = (e) => {
    e.preventDefault();


    const mailDetails = {
        to: to.current.value,
        subject: subject.current.value,
        message: editor.current.value
    }
    fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/sent.json`, {
        method: "POST",
        body: JSON.stringify(mailDetails)
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Something went wrong!");
        }
        else return res.json();
    }).then((data) => {
        console.log("MESSAGE SENT");
        to.current.value = '';
        subject.current.value = '';
        editor.current.value = ''
        window.location.reload();
    }).catch((err) => {
        console.error(err.message);
    });
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div>Compose</div>
          <div>Inbox</div>
          <div>Sent</div>
        </div>

        <form className={styles.form} onSubmit={formHandler}>
          <div>
            <label htmlFor="to">To:</label>
            <br />
            <input type="text" id="to" placeholder="Enter Reciever's Email" ref={to}/>
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <br />
            <input type="text" id="subject" placeholder="Enter The Subject" ref={subject}/>
          </div>
          <div className={styles.editor}>
            <label htmlFor="message">Message: </label>
            <br/>
            <JoditEditor
              ref={editor}
              value={content}
              // config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>
          <br />
          <button type="submit">Send</button>
        </form>
      </div>
    </Fragment>
  );
};
export default Home;
