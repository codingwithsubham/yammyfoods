import React from "react";
import Moment from "react-moment";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="hdr">
        <div className="title">About Us</div>
        <div className="separator" />
        <div className="sub-title">
          Yammy foods is a food ordering company that connects people with the
          best food in their Area. We do this by empowering local businesses and
          in turn, generate new ways for people to earn, work and live. We have
          started by facilitating Anywhere delivery- In Park, Grounds, door to
          door, to provide — easier evenings, happier days.
        </div>
      </div>
      <div className="body">
        <div className="title">Our Story</div>
        <div className="sub-title">
          Last Updated : <Moment format="DD/MM/YYYY">{Date.now()}</Moment>
        </div>
        <div className="content">
          Welcome to Yammy Foods, number one source for foodies. We’re dedicated
          to giving you the very best and fast food service, with a focus on
          your choice, your need and desiers. Founded in 2019, Yammy Foods has
          come a long way from its beginnings in Ghatal of Paschim Medinipur.
          When we first started out, our passion for ‘Find | Eat | Enjoy’ drove
          us to a “quit day job, do tons of research” so that Yammy Foods can
          offer you A Faster Food Service in your Locality. We now serve
          customers all over the Medinipur, and are thrilled that we’re able to
          turn our passion into our own website and app that brings your
          happiness to us. we hope you enjoy our Service as much as we enjoy
          offering them to you. If you have any questions or comments, please
          don’t hesitate to contact us. Sincerely, Team Yammy Foods
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
