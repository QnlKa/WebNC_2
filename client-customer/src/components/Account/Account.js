import "./Account.css";

const Account = (props) => {
  return (
    <div className="user__account__container">
      <div className="account__container">
        <div className="account__header">
          <h1>ACTIVE ACCOUNT SUCCESS FULL</h1>
        </div>
        <div className="account__page__detail">{props.children}</div>
      </div>
    </div>
  );
};

export default Account;
