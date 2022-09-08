import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import { getUsername } from "../../helper";
import { mailActions } from "../../store/mailSlice";
import Mail from "./Mail";

const Inbox = () => {
  const dispatch = useDispatch();
  let mails = [];
  const [inboxMail, setInboxMail] = useState([]);

  const user = localStorage.getItem("email");
  const username = getUsername(user);

  useEffect(() => {
    fetch(
      `https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/receiver.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let notOpened = 0;
        for (let [key, value] of Object.entries(data)) {
          mails.push({ key, ...value });
          if (value.isOpen === false) {
            notOpened += 1;
          }
        }
        setInboxMail(mails);
        dispatch(mailActions.countNotOpened(notOpened));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const deleteHandler = (key) => {
     fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/receiver/${key}.json`, {
        method: "DELETE",
    }).then((res) => {
        const index = inboxMail.findIndex((item) => item.key === key);
        inboxMail.splice(index, 1)
        setInboxMail(inboxMail);
        window.location.reload();
        // setInboxMail(arr);
    })
  }

  const notOpened = useSelector((state) => state.mail.totalNotOpened);

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <NavLink
            to="/home"
            className={styles.none}
            activeClassName={styles.active}
          >
            {" "}
            <div>Compose</div>
          </NavLink>
          <NavLink
            to="/inbox"
            className={styles.none}
            activeClassName={styles.active}
          >
            <div>
              Inbox <span className={styles.unread}>Unread ({notOpened})</span>
            </div>
          </NavLink>
          <NavLink
            to="/signup"
            className={styles.none}
            activeClassName={styles.active}
          >
            {" "}
            <div>Sent</div>
          </NavLink>
        </div>

        <div className={styles.mailsContainer}>
          {inboxMail.map((mail) => {
            return <Mail key={mail.key} mail={mail} deleteItem={deleteHandler} isSentBox={false} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default Inbox;
