import React, { Fragment, useState, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
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
    const regex = /(<([^>]+)>)/gi;
    const editorMessage = editor.current.value.replace(regex, "");

    const sentTo= to.current.value;
    const enteredSubject= subject.current.value;
    const enteredMessage= editorMessage;



    const mailDetails = {
        to: to.current.value,
        subject: subject.current.value,
        message: editorMessage
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
    const userReceived = getUsername(sentTo);
    const received_mail = {
        receiver: sentTo,
        subject: enteredSubject,
        message: enteredMessage,
        sender: user,
        isOpen: false
    }
    fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${userReceived}/receiver.json`, {
        method: "POST",
        body: JSON.stringify(received_mail)
    }).then((res) => {
        if (!res.ok) { throw new Error("Something went wrong!") }
        else return res.json();
    }).then((data) => {
      console.log(data);
    }).catch((err) => { console.log(err); });
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.sidebar}>
        <NavLink to="/home" className={styles.none} activeClassName={styles.active}> <div>Compose</div></NavLink>
          <NavLink to="/inbox" className={styles.none} activeClassName={styles.active}><div>Inbox</div></NavLink>
         <NavLink to="/sent" className={styles.none} activeClassName={styles.active}> <div>Sent</div></NavLink>
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
