import React from "react";
import * as advertiserService from "../services/advertiserService";
import AdvertCard from "./AdvertCard";
import { Modal } from "reactstrap";

class AdvertAll extends React.Component {
  state = {
    adver: [],
    mapAdvert: [],
    totalCount: 0,
    totalPages: 0,
    pageSize: 20,
    pageIndex: 0,
    modal: false
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  componentDidMount() {
    this.getAll();
  }
  getAll = () => {
    advertiserService
      .getAllAdvertiser(this.state.pageIndex, this.state.pageSize)
      .then(this.allSuccess)
      .catch(this.err);
  };
  allSuccess = data => {
    this.setState(() => ({ mapAdvert: data.item.pagedItems }));
  };
  mapAdvert = advert => <AdvertCard advert={advert} key={advert.id} />;
  render() {
    return (
      <div>
        {this.state.mapAdvert.map(this.mapAdvert)}
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <AdvertCard />
        </Modal>
      </div>
    );
  }
}
export default AdvertAll;
