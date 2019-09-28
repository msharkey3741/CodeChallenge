import React from "react";
import { Modal } from "reactstrap";
import AdvertCard from "./AdvertCard";

class AdverModal extends React.Component {
  state = {
    modal: false
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
        <AdvertCard />
      </Modal>
    );
  }
}
export default AdverModal;
