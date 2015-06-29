var React = require("react/addons");
var UserActions = require("../../store/useractions.js");
var ChattyActions = require("../../store/chattyactions.js");
var LoginScreen = require("./login.js");
var SearchBox = require("../posts/searchbox.js");

var styles = {
  openedMenu: {
    position: 'fixed',
    right: 0,
    overflowY: 'auto',
    paddingTop: 50,
    background: '#F6F9FA',
    marginTop: '26px',
    height: '100%',
    width: '200px',
    borderLeft: 'solid 2px #6F6F70',
  },
};

var StatusMenu = React.createClass({
  showLogin: function() {
    UserActions.showLoginForm();
  },
    onReorderClick: function() {
    ChattyActions.reorderThreads();
  },
  getInitialState: function() {
    return {showingReplies : false};
  },
  render: function() {
    var loginScreen = null;
    if(this.props.showLogin) {
      loginScreen = <LoginScreen loginMessage={this.props.loginMessage}/>;
    }
    
    var userinfo;
    if(this.props.username && this.props.username != "") {
      userinfo = <span>Logged in as {this.props.username}</span>;
    }
    else if(!this.props.showLogin){
      userinfo = <a href="#" onClick={this.showLogin}>Login</a>;  
    }
    
    var replies = null;
    if(this.state.showingReplies && this.props.unseenReplies.length == 0) {
      replies = <div><a style={styles.clickable} onClick={this.onShowReplies}>Show all</a></div>;
    } else if (this.props.unseenReplies.length !== 0) {
       replies = <div><a style={styles.clickable} onClick={this.onShowReplies}>{this.props.unseenReplies.length}</a></div>;
    }
    
    var searchBox = null;
    if(this.props.showSearch) {
      searchBox = <SearchBox />;
    }
    
    if(!this.props.isMenuOpened) return null;
    return (<div style={styles.openedMenu}>
      <div>Last Event ID: {this.props.lastEventId}</div> 
      <div><a href="#" style={styles.clickable} onClick={this.onReorderClick}>Reorder</a></div>
      {replies}
      {loginScreen}
      {userinfo}
      {searchBox}
    </div>);
    }
});

module.exports = StatusMenu;