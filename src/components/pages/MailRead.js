import { Fragment, useEffect } from "react";
import { useParams, NavLink} from "react-router-dom";
import { getUsername } from "../../helper";
import { mailActions } from "../../store/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";



const MailRead = (props) =>{
    const dispatch = useDispatch();
    const param = useParams();
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    const mail = useSelector(state => state.mail.mail);


    useEffect(() => {
        fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/receiver.json`)
        .then((res) => {return res.json()})
        .then((data) => {
             let inboxMails = [];
            for (let [key, value] of Object.entries(data)) {
                inboxMails.push({ key, ...value });  
            }
           const selectedMail = inboxMails.find((i) => i.key === param.id); 
           dispatch(mailActions.replaceMail(selectedMail));
        })     
    }, [])
  
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
              Inbox
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
         <p>Sender: <span>{mail.sender}</span></p>
         <p>Subject: <span>{mail.subject}</span></p>
         <p>Message: <span>{mail.message}</span></p>
       
        </div>
      </div>
    </Fragment>
    )
}

export default MailRead;