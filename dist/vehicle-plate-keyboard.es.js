import * as React from "react";
import React__default from "react";
import { createPortal } from "react-dom";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = React__default, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const TypeToStyle = {
  province: "province-cell",
  character: "character-cell",
  normal: "normal-cell"
};
const KeyboardCell = React.memo((props) => {
  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (!props.disabled && typeof props.onClick === "function") {
      props.onClick(props.cell);
    }
  };
  return /* @__PURE__ */ jsx("section", {
    className: `${"keyboard-cell"} ${TypeToStyle[props.type]} ${props.disabled ? "cell-disabled" : ""}`,
    "aria-disabled": props.disabled,
    "aria-label": props.cell,
    role: "button",
    onTouchEnd: handleTouchEnd,
    children: /* @__PURE__ */ jsx("span", {
      style: props.cellTextStyle,
      className: "cell-text",
      children: props.cell
    })
  });
});
var style = "";
const firstPage = [["\u4EAC", "\u6CAA", "\u7CA4", "\u6D25", "\u5180", "\u664B", "\u8499", "\u8FBD"], ["\u5409", "\u9ED1", "\u82CF", "\u6D59", "\u7696", "\u95FD", "\u8D63", "\u9C81"], ["\u8C6B", "\u9102", "\u6E58", "\u6842", "\u743C", "\u6E1D", "\u5DDD", "\u8D35"], ["\u4E91", "\u85CF", "\u9655", "\u7518", "\u9752", "\u5B81", "\u65B0", "\u4F7F"]];
const secondPage = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["Z", "X", "C", "V", "B", "N", "M"], ["\u6E2F", "\u6FB3", "\u5B66", "\u8B66", "\u9886"]];
const smallVehicleNewEnergy = "0123456789";
const newEnergyLetter = "ABCDEFGHJK";
const newEnergyLetterReg = new RegExp(`[${newEnergyLetter}]`);
const requestAnimationFrame = window.requestAnimationFrame;
const document = window.document;
const easeOut = (progress) => Math.pow(--progress, 5) + 1;
const isNewEnergyPlate = (plate) => {
  if (isNewEnergyBigVehicle(plate)) {
    return newEnergyLetter;
  } else if (isNewEnergySmallVehicle(plate)) {
    return smallVehicleNewEnergy;
  }
  return false;
};
const isNewEnergySmallVehicle = (plate) => newEnergyLetterReg.test(plate[2]) && /^[0-9]+$/.test(plate.slice(4, 7));
const isNewEnergyBigVehicle = (plate) => /^[0-9]+$/.test(plate.slice(2, 7));
const isAlphabet = (s) => /[ABCDEFGHJKLMNPQRSTUVWXYZ]/.test(s);
const isNumber = (s) => /[0-9]/.test(s);
const isSpecialCharacters = (s) => /[港澳学警领]/.test(s);
const onlyAllowInput = (s, onlyAllows) => {
  if (typeof onlyAllows === "string") {
    return onlyAllows.indexOf(s) !== -1;
  } else if (onlyAllows === 1) {
    return isAlphabet(s) || isNumber(s);
  } else if (onlyAllows === 2) {
    return isAlphabet(s);
  } else if (onlyAllows === 3) {
    return isNumber(s);
  } else if (onlyAllows === 4) {
    return isAlphabet(s) || isNumber(s) || isSpecialCharacters(s);
  }
  return true;
};
const LicenseKeyboard = React.memo((props) => {
  const [state, setState] = React.useState({
    keyboardOffsetProgress: 0
  });
  React.useEffect(() => {
    props.visible ? showKeyboard() : hideKeyboard();
    return () => {
      removeKeyboardDOM();
    };
  }, [props.visible]);
  const node = React.useRef(null);
  let elapsed = 0;
  let startTime = 0;
  let totalTime = 0;
  const resetTime = () => {
    startTime = performance.now();
    totalTime = 300;
  };
  const createKeyboardDOM = () => {
    node.current = document.querySelector("#vehiclePlateKeyboard") || document.createElement("div");
    node.current.id = "vehiclePlateKeyboard";
    document.body.appendChild(node.current);
    node.current.addEventListener("touchstart", handleTouchStart);
    node.current.addEventListener("touchmove", handleTouchMove);
  };
  const removeKeyboardDOM = () => {
    const currentNode = node.current;
    if (currentNode) {
      currentNode.removeEventListener("touchstart", handleTouchStart);
      currentNode.removeEventListener("touchmove", handleTouchMove);
    }
  };
  const showKeyboard = () => {
    createKeyboardDOM();
    resetTime();
    requestAnimationFrame(animationTick);
  };
  const hideKeyboard = () => {
    resetTime();
    requestAnimationFrame((time) => animationTick(time, "DOWN"));
  };
  const animationTick = (now, direction = "UP") => {
    elapsed = now - startTime;
    const progress = Math.min(easeOut(elapsed / totalTime), 1);
    setState((prevState) => ({
      ...prevState,
      keyboardOffsetProgress: direction === "UP" ? progress : 1 - progress
    }));
    if (progress < 1) {
      requestAnimationFrame((time) => animationTick(time, direction));
    }
  };
  const handleTouchStart = () => {
  };
  const handleTouchMove = (event) => {
    event.preventDefault();
  };
  const handleDone = () => {
    props.done();
  };
  const handleEnter = (cell) => props.value.length < 8 && props.onChange && props.onChange(props.value + cell);
  const handleDelete = () => props.value.length > 0 && props.onChange && props.onChange(props.value.slice(0, -1));
  const renderProvinceSelect = () => /* @__PURE__ */ jsx("article", {
    className: "keyboard-container",
    children: firstPage.map((row, index) => /* @__PURE__ */ jsx("section", {
      className: "keyboard-row",
      children: row.map((province) => /* @__PURE__ */ jsx(KeyboardCell, {
        cellTextStyle: props.cellTextStyle,
        cell: province,
        onClick: handleEnter,
        type: "province"
      }, province))
    }, index))
  });
  const renderNumberSelect = (type = 1) => /* @__PURE__ */ jsxs("article", {
    className: "keyboard-container",
    children: [/* @__PURE__ */ jsx("section", {
      className: "keyboard-row",
      children: secondPage[0].map((cell) => /* @__PURE__ */ jsx(KeyboardCell, {
        cellTextStyle: props.cellTextStyle,
        cell,
        onClick: handleEnter,
        disabled: !onlyAllowInput(cell, type),
        type: "normal"
      }, cell))
    }), /* @__PURE__ */ jsx("section", {
      className: "keyboard-row",
      children: secondPage[1].map((cell) => /* @__PURE__ */ jsx(KeyboardCell, {
        cellTextStyle: props.cellTextStyle,
        cell,
        onClick: handleEnter,
        disabled: !onlyAllowInput(cell, type),
        type: "normal"
      }, cell))
    }), /* @__PURE__ */ jsx("section", {
      className: "keyboard-row",
      children: secondPage[2].map((cell) => /* @__PURE__ */ jsx(KeyboardCell, {
        cellTextStyle: props.cellTextStyle,
        cell,
        onClick: handleEnter,
        disabled: !onlyAllowInput(cell, type),
        type: "normal"
      }, cell))
    }), /* @__PURE__ */ jsx("section", {
      className: "keyboard-row",
      children: secondPage[3].map((cell) => /* @__PURE__ */ jsx(KeyboardCell, {
        cellTextStyle: props.cellTextStyle,
        cell,
        onClick: handleEnter,
        disabled: !onlyAllowInput(cell, type),
        type: "normal"
      }, cell))
    }), /* @__PURE__ */ jsx("section", {
      className: "keyboard-row",
      children: secondPage[4].map((cell) => /* @__PURE__ */ jsx(KeyboardCell, {
        cellTextStyle: props.cellTextStyle,
        cell,
        onClick: handleEnter,
        disabled: !onlyAllowInput(cell, type),
        type: "character"
      }, cell)).concat(renderBackBtn())
    })]
  });
  const renderBackBtn = () => /* @__PURE__ */ jsx("section", {
    className: "keyboard-cell back-btn",
    onClick: handleDelete,
    children: /* @__PURE__ */ jsx("span", {
      className: "back-btn-svg",
      children: "\u232B"
    })
  }, "backBtn");
  const renderKeyboard = () => {
    switch (props.value.length) {
      case 0:
        return renderProvinceSelect();
      case 1:
        return renderNumberSelect(2);
      case 2:
        return renderNumberSelect();
      case 3:
        return renderNumberSelect();
      case 4:
        return renderNumberSelect();
      case 5:
        return renderNumberSelect();
      case 6:
        return renderNumberSelect(4);
      case 7:
        const newEnergyVehicleLastNumber = isNewEnergyPlate(props.value);
        if (isSpecialCharacters(props.value.slice(-1)) || newEnergyVehicleLastNumber === false) {
          return renderNumberSelect(0);
        }
        return renderNumberSelect(newEnergyVehicleLastNumber);
      default:
        return renderNumberSelect(0);
    }
  };
  if (node.current) {
    return createPortal(/* @__PURE__ */ jsxs("section", {
      style: {
        transform: `translateY(calc(${1 - state.keyboardOffsetProgress} * 100%))`
      },
      className: "vehicle-plate-keyboard-container",
      children: [/* @__PURE__ */ jsx("section", {
        className: "confirm",
        onClick: handleDone,
        children: /* @__PURE__ */ jsx("p", {
          style: props.confirmButtonStyle,
          children: props.confirmButtonText || "\u786E\u8BA4"
        })
      }), /* @__PURE__ */ jsx("section", {
        className: "keyboard",
        children: renderKeyboard()
      })]
    }), node.current);
  }
  return null;
});
export { LicenseKeyboard as default };
