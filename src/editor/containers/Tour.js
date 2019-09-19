import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Reactusertour from '@bnchdrff/react-user-tour';

import * as actions from '../actions';

const steps = [
  {
    step: 1,
    selector: '.Dropdown-control',
    position: 'bottom',
    title: <strong>Pick a 990</strong>,
    body: <p>{"If you don't have any forms yet, just ask us to assign one. The forms in your list are labeled as new if you haven't started yet, or with the page number of where you last left off."}</p>,
  },
  {
    step: 2,
    selector: '.Pdfviewer-container',
    position: 'right',
    verticalOffset: 100,
    horizontalOffset: -100,
    title: <strong>The PDF will show up on the left hand side</strong>,
    body: <p>Use the purple control buttons in the upper left to move through the PDF.</p>,
  },
  {
    step: 3,
    selector: '.Addgrantframe-container',
    position: 'left',
    verticalOffset: 100,
    horizontalOffset: 100,
    title: <strong>The grant entry form displays on the right hand side</strong>,
    body: <p>{"The title and timeframe of the 990 you selected should already be autofilled in the year and funder fields. Unless otherwise specified, we assume grants span the organization's fiscal year. You can still adjust the autocompleted fields if necessary and they'll carry through from grant to grant."}</p>,
  },
  {
    step: 4,
    selector: '.Pdfviewer-pager button.next',
    position: 'bottom',
    title: <strong>Find Schedule I: Grants and Other Assistance...</strong>,
    body: <p>{"Scroll through the 990 until you come to Schedule I. This is the section in the 990s where grants are recorded. It's usually towards the end and might be formatted like a table or plain list."}</p>,
  },
  {
    step: 5,
    selector: '#edit-field-year',
    iframeSelector: 'iframe',
    position: 'left',
    title: <strong>Add your first grant!</strong>,
    body: <p>{`Find the first grant recipient listed. Decide if the recipient meets the Ledger's criteria - is the recipient organization's address in Detroit? Does the grant purpose explicitly mention Detroit? If either of these are true, then this grant should be added. Add the recipient (this will autofill as you type), amount, and description if available. Click save.`}</p>,
  },
  {
    step: 6,
    selector: '#field-recipient-add-more-wrapper',
    iframeSelector: 'iframe',
    position: 'left',
    title: <strong>{"Add a new organization if it doesn't already exist"}</strong>,
    body: <p>{`When you're adding recipient organizations, you'll notice that the field autofills. If you don't see the organization you're looking for, you'll need to add it new. Click the "Add them here" link below the field and fill in at least the organization's name and their EIN (employer identification number) if known on the next form and click save. Now you'll see them as a recipient choice.`}</p>,
  },
  {
    step: 7,
    selector: '.DoneUserpdf',
    iframeSelector: 'iframe',
    position: 'bottom',
    title: <strong>Repeat until you can mark your 990 as done</strong>,
    body: <p>{"Keep entering grant recipients that meet the Detroit impact criteria. Once you reach the end of Schedule I, mark your 990 as done using the top checkbox and pick another 990 to start! If you need to leave off sooner, we'll save your page number until next time."}</p>,
  },
];

const style = {
  height: 220,
  width: 380,
  position: 'absolute',
  zIndex: 9999,
  backgroundColor: '#d0d0d0',
  color: "#494949",
  boxShadow: "0 6px 8px 0 rgba(0, 0, 0, 0.24)",
  padding: '1em',
};

export const Tour = ({ active, step, tourSetStep, tourStop }) => (
  <div style={{ position: 'absolute', top: 0, left: 0 }}>
    <Reactusertour
      active={active}
      step={step}
      onNext={tourSetStep}
      onBack={tourSetStep}
      onCancel={tourStop}
      steps={steps}
      style={style}
      arrowColor={style.backgroundColor}
      closeButtonText={"x"}
    />
  </div>
);

Tour.propTypes = {
  active: PropTypes.bool.isRequired,
  step: PropTypes.number.isRequired,
  tourSetStep: PropTypes.func.isRequired,
  tourStop: PropTypes.func.isRequired,
};

export default connect(
  ({ editor: { tour: { active, step }}}) => ({
    active,
    step,
  }),
  actions
)(Tour);


