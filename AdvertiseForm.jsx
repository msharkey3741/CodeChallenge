import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Form } from "reactstrap";
import { Alert } from "reactstrap";
import * as advertiserService from "../services/advertiserService";
import Swal from "sweetalert";
import AdvertAll from "./AdvertAll";

class AdvertiseForm extends React.Component {
  state = {
    visible: false,
    formData: {
      statusId: 1,
      shortTitle: "",
      title: "",
      content: "",
      slug: "",
      entityTypeId: 1,
      latitude: 70,
      longitude: 70,
      dateStart: "2019-09-13 17:48:48.7700000",
      dateEnd: "2019-09-13 17:48:48.7700000",
      zipCode: "",
      address: "",
      shortDescription: ""
    }
  };
  handleSubmit = formikValues => {
    console.log(formikValues);
    advertiserService
      .addAdvertiser(formikValues)
      .then(this.addSuccess)
      .catch(this.err);
  };
  addSuccess = response => {
    Swal({
      title: "Success",
      text: "Ad created",
      icon: "success"
    });
    console.log(response);
  };
  err = response => {
    console.log(response);
  };
  handleChange = ev => {
    const formData = {
      ...this.state.formData,
      [ev.target.name]: ev.target.value
    };
    return formData;
  };
  render() {
    return (
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {formikProps => {
            const { values } = formikProps;
            return (
              <Form
                onSubmit={formikProps.handleSubmit}
                className="form-horizontal"
                onChange={this.handleChange}
              >
                <FormGroup>
                  <Alert
                    color="primary"
                    isOpen={this.state.visible}
                    toggle={this.onDismiss}
                  >
                    Email Sent
                  </Alert>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="col-form-label">shortTitle</label>
                      <Field
                        name="shortTitle"
                        type="text"
                        value={values.shortTitle}
                        label="shortTitle"
                        autoComplete="off"
                        className="form-control btn-square input-md"
                      />
                      {formikProps.touched.shortTitle &&
                        formikProps.errors.shortTitle && (
                          <div className="text-danger">
                            {formikProps.errors.shortTitle}
                          </div>
                        )}
                    </div>
                    <div
                      className="form-group col-md-6"
                      style={{ paddingRight: 25 }}
                    >
                      <label htmlFor="col-form-label">title</label>

                      <Field
                        name="title"
                        type="text"
                        values={values.title}
                        className="form-control btn-square input-md"
                      />
                      <ErrorMessage name="title" />
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="form-group col-md-4"
                      style={{ paddingLeft: 15 }}
                    >
                      <label htmlFor="col-form-label">shortDescription</label>

                      <Field
                        name="shortDescription"
                        type="text"
                        values={values.city}
                        className="form-control btn-square input-md"
                      />
                      {formikProps.touched.shortDescription &&
                        formikProps.errors.shortDescription && (
                          <div className="text-danger">
                            {formikProps.errors.shortDescription}
                          </div>
                        )}
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">content</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="content"
                          type="text"
                          values={values.content}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.content &&
                          formikProps.errors.content && (
                            <div className="text-danger">
                              {formikProps.errors.content}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">slug</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="slug"
                          type="text"
                          values={values.slug}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.slug &&
                          formikProps.errors.slug && (
                            <div className="text-danger">
                              {formikProps.errors.slug}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">entityTypeId</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="entityTypeId"
                          type="number"
                          values={values.entityTypeId}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.entityTypeId &&
                          formikProps.errors.entityTypeId && (
                            <div className="text-danger">
                              {formikProps.errors.entityTypeId}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">statusId</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="statusId"
                          type="number"
                          values={values.statusId}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.statusId &&
                          formikProps.errors.statusId && (
                            <div className="text-danger">
                              {formikProps.errors.statusId}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">dateStart</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="dateStart"
                          type="text"
                          values={values.dateStart}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.dateStart &&
                          formikProps.errors.dateStart && (
                            <div className="text-danger">
                              {formikProps.errors.dateStart}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">dateEnd</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="dateEnd"
                          type="text"
                          values={values.content}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.dateEnd &&
                          formikProps.errors.dateEnd && (
                            <div className="text-danger">
                              {formikProps.errors.dateEnd}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">latitude</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="latitude"
                          type="text"
                          values={values.latitude}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.latitude &&
                          formikProps.errors.latitude && (
                            <div className="text-danger">
                              {formikProps.errors.latitude}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">longitude</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="longitude"
                          type="text"
                          values={values.longitude}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.longitude &&
                          formikProps.errors.longitude && (
                            <div className="text-danger">
                              {formikProps.errors.longitude}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">address</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="address"
                          type="text"
                          values={values.address}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.address &&
                          formikProps.errors.address && (
                            <div className="text-danger">
                              {formikProps.errors.address}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="col-form-label">zipCode</label>
                      <div className="col" style={{ paddingLeft: 1 }}>
                        <Field
                          name="zipCode"
                          type="text"
                          values={values.zipCode}
                          className="form-control btn-square input-md"
                        />
                        {formikProps.touched.zipCode &&
                          formikProps.errors.zipCode && (
                            <div className="text-danger">
                              {formikProps.errors.zipCode}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <Button type="submit">Add Advertise</Button>
                </FormGroup>
              </Form>
            );
          }}
        </Formik>
        <AdvertAll />
      </div>
    );
  }
}
export default AdvertiseForm;
