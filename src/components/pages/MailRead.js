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
      if(!props.isSent) {
        fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/receiver.json`)
        .then((res) => {return res.json()})
        .then((data) => {
             let inboxMails = [];
            for (let [key, value] of Object.entries(data)) {
                inboxMails.push({ key, ...value });  
            }
           const selectedMail = inboxMails.find((i) => i.key === param.id); 
           dispatch(mailActions.replaceMail(selectedMail));
        }) }else {
          fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/sent.json`)
          .then((res) => {return res.json()})
          .then((data) => {
               let inboxMails = [];
              for (let [key, value] of Object.entries(data)) {
                  inboxMails.push({ key, ...value });  
              }
             const selectedMail = inboxMails.find((i) => i.key === param.id); 
             dispatch(mailActions.replaceMail(selectedMail));
          })
        }    
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
            to="/sent"
            className={styles.none}
            activeClassName={styles.active}
          >
            {" "}
            <div>Sent</div>
          </NavLink>
        </div>

        <div className={styles.mailsContainer}>
        {!props.isSent && <p><span className={styles.bold}>From:</span> <span>{mail.receiver}</span></p>}
        {props.isSent && <p><span className={styles.bold}>To:</span> <span>{mail.to}</span></p>}
         <p><span className={styles.bold}>Subject:</span> <span>{mail.subject}</span></p>
         <p><span className={styles.bold}>Message:</span> <span>{mail.message}</span></p>
       
        </div>
      </div>
    </Fragment>
    )
}

export default MailRead;