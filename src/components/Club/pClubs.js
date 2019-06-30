import React, { Component } from "react";

import { getParticularclub } from "../../redux/actions/clubActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { Col } from "antd";
import { Paper, Chip, Typography, withStyles,IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import './pClub.css';
import Feed from '../Feed/Feed';
const classes = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
});

class particularclubs extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.clubId;
    this.props.getParticularclub(id);
  };
  render() {
    const { clubData } = this.props;
    const data = {
      ...clubData
    };
    if (data.clubs !== undefined) {
      const dataClub = {
        ...data.clubs.club
      };
      const coordinators = dataClub.coordinators.map(el=>{
        return <li>{el}</li>
      })
      const SubCoordinators = dataClub.subCoordinators.map(el=>{
        return <li>{el}</li>
      })
      // const Feeds = dataClub.
      console.log(dataClub);
      return (
        <div id="club">
          <Col lg={{span:10, offset:2}} xs={{span:20,offset:4}}>
              <div className="content">
                <div className="header">
                  <Typography variant="h2" component="h2" gutterBottom>
                    {dataClub.name}
                  </Typography>
                </div>
                <div className="information">
                  <Chip color="secondary" label={dataClub.bio} />
                  <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                  <span>{dataClub.followers}</span>
                </IconButton>
                  <Typography variant="subtitle1" gutterBottom>Description :</Typography>
                  <Typography variant="body1" gutterBottom style={{fontSize:20}}>
                    {dataClub.description.substr(100)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>Our Coordinators :</Typography>
                  <Typography variant="body1" gutterBottom className="List">
                    {coordinators}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>Our Subcoordinators :</Typography>
                  <Typography variant="body1" gutterBottom className="List">
                    {SubCoordinators}
                  </Typography>
                  <Typography variant="h6" component="h2" gutterBottom>
                    <a href={dataClub.website}>Visit Our Website</a>
                  </Typography>
                </div>
              </div>
          </Col>
          <Col lg={{span:6, offset:6}} xs={{span:20,offset:4}}>
            <Paper>
              Feed
            </Paper>
          </Col>
        </div>
      );
    }
    return null;
  }
}
const mapStateToProps = state => ({
  clubData: state.club
});
export default compose(
  connect(
    mapStateToProps,
    { getParticularclub }
  ),
  withStyles(classes, { withTheme: true })
)(particularclubs);
