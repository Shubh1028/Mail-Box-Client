import React, {Fragment, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import styles from "./Home.module.css";
import { getUsername } from "../../helper";
import Mail from './Mail';

const Inbox = () => {
    let mails = [];
    const [inboxMail, setInboxMail] = useState([]);

    const user = localStorage.getItem("email");
    const username = getUsername(user);

    useEffect(() => {
        fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/receiver.json`).then((res) => {
            return res.json();
        }).then((data) => {
            let notOpened = 0;
            for (let [key, value] of Object.entries(data)) {
                mails.push({ key, ...value }); 
            }
            setInboxMail(mails);
        }).catch((err) => {
            console.log(err);
        });
    },[]);

    return (
        <Fragment>
        <div className={styles.container}>
          <div className={styles.sidebar}>
          <NavLink to="/home" className={styles.none} activeClassName={styles.active}> <div>Compose</div></NavLink>
            <NavLink to="/inbox" className={styles.none} activeClassName={styles.active}><div>Inbox</div></NavLink>
           <NavLink to="/signup" className={styles.none} activeClassName={styles.active}> <div>Sent</div></NavLink>
          </div>
  
          <div className={styles.mailsContainer}>
          {inboxMail.map((mail) => {
                        return <Mail key={mail.key} mail={mail} isSentBox={false} />
                    })}
          
          </div>
        </div>
      </Fragment>
    )
}
export default Inbox;