import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { SwipeListView } from "react-native-swipe-list-view";

import db from "../config";

export default class SwipeableFlatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotifications: this.props.allNotifications,
      flag: 0,
      refresh: false
    };
  }

  
  componentWillReceiveProps(nextProps) {
    this.setState({ allNotifications: nextProps.allNotifications });  
  }



  updateMarkAsread = notification => {
    db.collection("ReminderAdds")
      .doc(notification.doc_id)
      .update({
        notificationStatus: 1
      });
  };

  onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    if(value<0 && value>=-10){
      this.setState({
        flag:0
      })
    }
    if(this.state.flag === 0) {
      var allNotifications = this.state.allNotifications;
      if (value < -Dimensions.get("window").width) {       
        const newData = [...allNotifications];
        this.updateMarkAsread(allNotifications[key]);
        newData.splice(key, 1);
        this.setState({
          allNotifications: newData,
          flag: 1,
          refresh: !this.state.refresh });
      }
    }
    
  };

  renderItem = data => (
    <Animated.View>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{data.item.reminderDate}</ListItem.Title>
          <ListItem.Subtitle>{data.item.details}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Animated.View>
  );

  renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Mark as read</Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SwipeListView
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={this.onSwipeValueChange}
          keyExtractor={(item, index) => index.toString()}
          key={this.state.refresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "flex-start"
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#29b6f6",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 100
  },
  backRightBtnRight: {
    backgroundColor: "#29b6f6",
    right: 0
  }
});
