var React = require("react/addons");
var Reflux = require("reflux");
var CommentList = require("./commentlist.js");
var StatusBar = require("./statusbar.js");
var ChattyActions = require("../store/chattyactions.js");
var ChattyStore = require("../store/chattystore.js");
var UserStore = require("../store/userstore.js");
var keymaster = require("keymaster");

//TODO add unmount for deregistering keymaster
var RefluxChatty = React.createClass({
    mixins: [Reflux.connect(UserStore,"UserStore"),Reflux.connect(ChattyStore,"ChattyStore")
      ],
    getInitialState: function() {
      
    },
    componentDidMount: function () {
        ChattyActions.startChatty();
        keymaster('a', function() {
           ChattyActions.selectPrevComment();
        });
        keymaster('z', function() {
            ChattyActions.selectNextComment();
        });
        keymaster('j', function() {
           ChattyActions.selectNextParent();
        });
        keymaster('k', function() {
            ChattyActions.selectPrevParent(); 
        });
        keymaster('x', function() {
            ChattyActions.toggleParentComment();
        });
        keymaster('r', function() {
          ChattyActions.openReply();
        });
        keymaster('home', function() {
            ChattyActions.selectFirstParent();
        });
        keymaster('end', function() {
            ChattyActions.selectLastParent();
        });
    },
    componentDidUpdate: function() {
      
    },
    render: function() {
      return (<div>
        <StatusBar username={this.state.UserStore.username} 
          pms={this.state.UserStore.pms}
          showLogin={this.state.UserStore.showLogin}
          loginMessage={this.state.UserStore.loginMessage}
          connected={this.state.ChattyStore.connected}
          lastEventId={this.state.ChattyStore.eventId} 
          totalPMs={this.state.UserStore.totalPMs} 
          unreadPMs={this.state.UserStore.unreadPMs}
          unseenReplies={this.state.UserStore.unseenReplies}
          />
         
        <CommentList threads={this.state.ChattyStore.threads} 
          visibleThreads={this.state.ChattyStore.visibleThreads}
          replyingTo={this.state.ChattyStore.replyingTo} 
          username={this.state.UserStore.username}/>
      </div>);
    }
});

module.exports = RefluxChatty;