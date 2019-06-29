import React, { Component } from "react";
import "antd/dist/antd.css";
import "./Clubs.css";
import { getClub } from "../../redux/actions/clubActions.js";
import { Row, Col, Spin, Alert,Icon } from "antd";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { Paper, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { compose } from "redux";
import { connect } from "react-redux";

const classes = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class Clubs extends Component {
  componentDidMount = () => {
    this.props.getClub();
  };
  render() {
    const { classes, club } = this.props;
    let clubLists;
    if (club) {
      if (club.clubs !== undefined) {
          console.log(club.clubs[0].pages)
        clubLists = club.clubs.map(el => {
          return (
            <Row key={el._id}>
              <Card
                className={classes.card}
                style={{ marginTop: 20, marginBottom: 30 }}
              >
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      {el.name.toString()[0]}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="Settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={el.name}
                  subheader={el.bio}
                />
                <CardMedia
                  className={classes.media}
                  image="https://source.unsplash.com/random"
                  title="Paella dish"
                />{" "}
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                  <span style={{padding:10}}>{el.followers}</span>
                </IconButton>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {el.description.substr(0,200)}
                   <span style={{lineHeight:3,display:"block"}}><Link to="#">Visit Our Site</Link></span>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <Icon  style={{padding:10}} type="facebook" />
                <Icon  style={{padding:10}} type="linkedin" />
                <Icon  style={{padding:10}} type="instagram" />
                <Icon  style={{padding:10}} type="twitter" />
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Row>
          );
        });
        club.clubs.forEach(element => {
          console.log(element);
        });
      } else {
        clubLists = [
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            key="spinner"
          >
            <Spin tip="Loading..." size="large" />
          </div>
        ];
      }
    }
    return <div className="layout">{clubLists}</div>;
  }
}

const mapStatetoProps = state => ({
  club: state.club
});
export default compose(
  connect(
    mapStatetoProps,
    { getClub }
  ),
  withStyles(classes, { withTheme: true })
)(Clubs);
