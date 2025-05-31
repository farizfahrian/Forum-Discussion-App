import React from 'react';
import PropTypes from 'prop-types';

function Chip({ label }) {
  return (
    <div data-testid="chip" className="inline-flex justify-center items-center px-2 py-1 rounded-full border bg-neutral-800 h-fit border-neutral-500">
      <div className="justify-start text-sm font-medium text-neutral-50">{label.charAt(0).toUpperCase() + label.slice(1)}</div>
    </div>
  );
}

Chip.propTypes = {
  /** Label for the chip */
  label: PropTypes.string.isRequired
};

export default Chip;
