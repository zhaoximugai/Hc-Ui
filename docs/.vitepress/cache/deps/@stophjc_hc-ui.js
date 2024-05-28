import {
  config$1,
  icon,
  library$1,
  parse$1,
  text
} from "./chunk-2KQZH5BE.js";
import {
  Fragment,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  defineComponent,
  guardReactiveProps,
  h,
  inject,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeMount,
  onMounted,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  ref,
  render,
  renderList,
  renderSlot,
  toDisplayString,
  toHandlers,
  unref,
  useAttrs,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-G7P6XGB7.js";
import {
  icons
} from "./chunk-HHPN5N4J.js";

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i3) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i3).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i2 = numberOfChecks; _i2 > 0; _i2--) {
      var _ret = _loop(_i2);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/@stophjc/hc-ui/dist/es/hc-ui.js
function At(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function D(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? At(Object(n), true).forEach(function(r) {
      M(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : At(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Ve(e) {
  "@babel/helpers - typeof";
  return Ve = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ve(e);
}
function M(e, t, n) {
  return t = gr(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[t] = n, e;
}
function ur(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), a, o;
  for (o = 0; o < r.length; o++)
    a = r[o], !(t.indexOf(a) >= 0) && (n[a] = e[a]);
  return n;
}
function fr(e, t) {
  if (e == null)
    return {};
  var n = ur(e, t), r, a;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (a = 0; a < o.length; a++)
      r = o[a], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function We(e) {
  return cr(e) || dr(e) || pr(e) || hr();
}
function cr(e) {
  if (Array.isArray(e))
    return Ge(e);
}
function dr(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function pr(e, t) {
  if (e) {
    if (typeof e == "string")
      return Ge(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ge(e, t);
  }
}
function Ge(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function hr() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function yr(e, t) {
  if (typeof e != "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gr(e) {
  var t = yr(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
var vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var pn = { exports: {} };
(function(e) {
  (function(t) {
    var n = function(u, g, v) {
      if (!f(g) || y(g) || w(g) || b(g) || l(g))
        return g;
      var _, O = 0, d = 0;
      if (p(g))
        for (_ = [], d = g.length; O < d; O++)
          _.push(n(u, g[O], v));
      else {
        _ = {};
        for (var m in g)
          Object.prototype.hasOwnProperty.call(g, m) && (_[u(m, v)] = n(u, g[m], v));
      }
      return _;
    }, r = function(u, g) {
      g = g || {};
      var v = g.separator || "_", _ = g.split || /(?=[A-Z])/;
      return u.split(_).join(v);
    }, a = function(u) {
      return x(u) ? u : (u = u.replace(/[\-_\s]+(.)?/g, function(g, v) {
        return v ? v.toUpperCase() : "";
      }), u.substr(0, 1).toLowerCase() + u.substr(1));
    }, o = function(u) {
      var g = a(u);
      return g.substr(0, 1).toUpperCase() + g.substr(1);
    }, i = function(u, g) {
      return r(u, g).toLowerCase();
    }, s = Object.prototype.toString, l = function(u) {
      return typeof u == "function";
    }, f = function(u) {
      return u === Object(u);
    }, p = function(u) {
      return s.call(u) == "[object Array]";
    }, y = function(u) {
      return s.call(u) == "[object Date]";
    }, w = function(u) {
      return s.call(u) == "[object RegExp]";
    }, b = function(u) {
      return s.call(u) == "[object Boolean]";
    }, x = function(u) {
      return u = u - 0, u === u;
    }, h2 = function(u, g) {
      var v = g && "process" in g ? g.process : g;
      return typeof v != "function" ? u : function(_, O) {
        return v(_, u, O);
      };
    }, c = {
      camelize: a,
      decamelize: i,
      pascalize: o,
      depascalize: i,
      camelizeKeys: function(u, g) {
        return n(h2(a, g), u);
      },
      decamelizeKeys: function(u, g) {
        return n(h2(i, g), u, g);
      },
      pascalizeKeys: function(u, g) {
        return n(h2(o, g), u);
      },
      depascalizeKeys: function() {
        return this.decamelizeKeys.apply(this, arguments);
      }
    };
    e.exports ? e.exports = c : t.humps = c;
  })(vr);
})(pn);
var mr = pn.exports;
var br = ["class", "style"];
function _r(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), a = mr.camelize(n.slice(0, r)), o = n.slice(r + 1).trim();
    return t[a] = o, t;
  }, {});
}
function wr(e) {
  return e.split(/\s+/).reduce(function(t, n) {
    return t[n] = true, t;
  }, {});
}
function ft(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == "string")
    return e;
  var r = (e.children || []).map(function(l) {
    return ft(l);
  }), a = Object.keys(e.attributes || {}).reduce(function(l, f) {
    var p = e.attributes[f];
    switch (f) {
      case "class":
        l.class = wr(p);
        break;
      case "style":
        l.style = _r(p);
        break;
      default:
        l.attrs[f] = p;
    }
    return l;
  }, {
    attrs: {},
    class: {},
    style: {}
  });
  n.class;
  var o = n.style, i = o === void 0 ? {} : o, s = fr(n, br);
  return h(e.tag, D(D(D({}, t), {}, {
    class: a.class,
    style: D(D({}, a.style), i)
  }, a.attrs), s), r);
}
var hn = false;
try {
  hn = false;
} catch {
}
function Or() {
  if (!hn && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function _e(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? M({}, e, t) : {};
}
function $r(e) {
  var t, n = (t = {
    "fa-spin": e.spin,
    "fa-pulse": e.pulse,
    "fa-fw": e.fixedWidth,
    "fa-border": e.border,
    "fa-li": e.listItem,
    "fa-inverse": e.inverse,
    "fa-flip": e.flip === true,
    "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
    "fa-flip-vertical": e.flip === "vertical" || e.flip === "both"
  }, M(t, "fa-".concat(e.size), e.size !== null), M(t, "fa-rotate-".concat(e.rotation), e.rotation !== null), M(t, "fa-pull-".concat(e.pull), e.pull !== null), M(t, "fa-swap-opacity", e.swapOpacity), M(t, "fa-bounce", e.bounce), M(t, "fa-shake", e.shake), M(t, "fa-beat", e.beat), M(t, "fa-fade", e.fade), M(t, "fa-beat-fade", e.beatFade), M(t, "fa-flash", e.flash), M(t, "fa-spin-pulse", e.spinPulse), M(t, "fa-spin-reverse", e.spinReverse), t);
  return Object.keys(n).map(function(r) {
    return n[r] ? r : null;
  }).filter(function(r) {
    return r;
  });
}
function xt(e) {
  if (e && Ve(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (parse$1.icon)
    return parse$1.icon(e);
  if (e === null)
    return null;
  if (Ve(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
var Tr = defineComponent({
  name: "FontAwesomeIcon",
  props: {
    border: {
      type: Boolean,
      default: false
    },
    fixedWidth: {
      type: Boolean,
      default: false
    },
    flip: {
      type: [Boolean, String],
      default: false,
      validator: function(t) {
        return [true, false, "horizontal", "vertical", "both"].indexOf(t) > -1;
      }
    },
    icon: {
      type: [Object, Array, String],
      required: true
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    maskId: {
      type: String,
      default: null
    },
    listItem: {
      type: Boolean,
      default: false
    },
    pull: {
      type: String,
      default: null,
      validator: function(t) {
        return ["right", "left"].indexOf(t) > -1;
      }
    },
    pulse: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: function(t) {
        return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
      }
    },
    swapOpacity: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator: function(t) {
        return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
      }
    },
    spin: {
      type: Boolean,
      default: false
    },
    transform: {
      type: [String, Object],
      default: null
    },
    symbol: {
      type: [Boolean, String],
      default: false
    },
    title: {
      type: String,
      default: null
    },
    titleId: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    },
    shake: {
      type: Boolean,
      default: false
    },
    beat: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    beatFade: {
      type: Boolean,
      default: false
    },
    flash: {
      type: Boolean,
      default: false
    },
    spinPulse: {
      type: Boolean,
      default: false
    },
    spinReverse: {
      type: Boolean,
      default: false
    }
  },
  setup: function(t, n) {
    var r = n.attrs, a = computed(function() {
      return xt(t.icon);
    }), o = computed(function() {
      return _e("classes", $r(t));
    }), i = computed(function() {
      return _e("transform", typeof t.transform == "string" ? parse$1.transform(t.transform) : t.transform);
    }), s = computed(function() {
      return _e("mask", xt(t.mask));
    }), l = computed(function() {
      return icon(a.value, D(D(D(D({}, o.value), i.value), s.value), {}, {
        symbol: t.symbol,
        title: t.title,
        titleId: t.titleId,
        maskId: t.maskId
      }));
    });
    watch(l, function(p) {
      if (!p)
        return Or("Could not find one or more icon(s)", a.value, s.value);
    }, {
      immediate: true
    });
    var f = computed(function() {
      return l.value ? ft(l.value.abstract[0], {}, r) : null;
    });
    return function() {
      return f.value;
    };
  }
});
defineComponent({
  name: "FontAwesomeLayers",
  props: {
    fixedWidth: {
      type: Boolean,
      default: false
    }
  },
  setup: function(t, n) {
    var r = n.slots, a = config$1.familyPrefix, o = computed(function() {
      return ["".concat(a, "-layers")].concat(We(t.fixedWidth ? ["".concat(a, "-fw")] : []));
    });
    return function() {
      return h("div", {
        class: o.value
      }, r.default ? r.default() : []);
    };
  }
});
defineComponent({
  name: "FontAwesomeLayersText",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    transform: {
      type: [String, Object],
      default: null
    },
    counter: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: null,
      validator: function(t) {
        return ["bottom-left", "bottom-right", "top-left", "top-right"].indexOf(t) > -1;
      }
    }
  },
  setup: function(t, n) {
    var r = n.attrs, a = config$1.familyPrefix, o = computed(function() {
      return _e("classes", [].concat(We(t.counter ? ["".concat(a, "-layers-counter")] : []), We(t.position ? ["".concat(a, "-layers-").concat(t.position)] : [])));
    }), i = computed(function() {
      return _e("transform", typeof t.transform == "string" ? parse$1.transform(t.transform) : t.transform);
    }), s = computed(function() {
      var f = text(t.value.toString(), D(D({}, i.value), o.value)), p = f.abstract;
      return t.counter && (p[0].attributes.class = p[0].attributes.class.replace("fa-layers-text", "")), p[0];
    }), l = computed(function() {
      return ft(s.value, {}, r);
    });
    return function() {
      return l.value;
    };
  }
});
var yn = typeof global == "object" && global && global.Object === Object && global;
var Ar = typeof self == "object" && self && self.Object === Object && self;
var U = yn || Ar || Function("return this")();
var Z = U.Symbol;
var gn = Object.prototype;
var xr = gn.hasOwnProperty;
var jr = gn.toString;
var ve = Z ? Z.toStringTag : void 0;
function Sr(e) {
  var t = xr.call(e, ve), n = e[ve];
  try {
    e[ve] = void 0;
    var r = true;
  } catch {
  }
  var a = jr.call(e);
  return r && (t ? e[ve] = n : delete e[ve]), a;
}
var Pr = Object.prototype;
var Fr = Pr.toString;
function Ir(e) {
  return Fr.call(e);
}
var Er = "[object Null]";
var Cr = "[object Undefined]";
var jt = Z ? Z.toStringTag : void 0;
function ie(e) {
  return e == null ? e === void 0 ? Cr : Er : jt && jt in Object(e) ? Sr(e) : Ir(e);
}
function oe(e) {
  return e != null && typeof e == "object";
}
var Br = "[object Symbol]";
function ke(e) {
  return typeof e == "symbol" || oe(e) && ie(e) == Br;
}
function vn(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var se = Array.isArray;
var Nr = 1 / 0;
var St = Z ? Z.prototype : void 0;
var Pt = St ? St.toString : void 0;
function mn(e) {
  if (typeof e == "string")
    return e;
  if (se(e))
    return vn(e, mn) + "";
  if (ke(e))
    return Pt ? Pt.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Nr ? "-0" : t;
}
var qr = /\s/;
function Vr(e) {
  for (var t = e.length; t-- && qr.test(e.charAt(t)); )
    ;
  return t;
}
var Mr = /^\s+/;
function kr(e) {
  return e && e.slice(0, Vr(e) + 1).replace(Mr, "");
}
function Q(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ft = NaN;
var Dr = /^[-+]0x[0-9a-f]+$/i;
var Rr = /^0b[01]+$/i;
var zr = /^0o[0-7]+$/i;
var Lr = parseInt;
function It(e) {
  if (typeof e == "number")
    return e;
  if (ke(e))
    return Ft;
  if (Q(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Q(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = kr(e);
  var n = Rr.test(e);
  return n || zr.test(e) ? Lr(e.slice(2), n ? 2 : 8) : Dr.test(e) ? Ft : +e;
}
function Ur(e) {
  return e;
}
var Hr = "[object AsyncFunction]";
var Kr = "[object Function]";
var Wr = "[object GeneratorFunction]";
var Gr = "[object Proxy]";
function we(e) {
  if (!Q(e))
    return false;
  var t = ie(e);
  return t == Kr || t == Wr || t == Hr || t == Gr;
}
var ze = U["__core-js_shared__"];
var Et = function() {
  var e = /[^.]+$/.exec(ze && ze.keys && ze.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Zr(e) {
  return !!Et && Et in e;
}
var Yr = Function.prototype;
var Xr = Yr.toString;
function le(e) {
  if (e != null) {
    try {
      return Xr.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Jr = /[\\^$.*+?()[\]{}|]/g;
var Qr = /^\[object .+?Constructor\]$/;
var ea = Function.prototype;
var ta = Object.prototype;
var na = ea.toString;
var ra = ta.hasOwnProperty;
var aa = RegExp(
  "^" + na.call(ra).replace(Jr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ia(e) {
  if (!Q(e) || Zr(e))
    return false;
  var t = we(e) ? aa : Qr;
  return t.test(le(e));
}
function oa(e, t) {
  return e == null ? void 0 : e[t];
}
function ue(e, t) {
  var n = oa(e, t);
  return ia(n) ? n : void 0;
}
var Ze = ue(U, "WeakMap");
var Ct = Object.create;
var sa = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!Q(t))
      return {};
    if (Ct)
      return Ct(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function la(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
function ua(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var fa = 800;
var ca = 16;
var da = Date.now;
function pa(e) {
  var t = 0, n = 0;
  return function() {
    var r = da(), a = ca - (r - n);
    if (n = r, a > 0) {
      if (++t >= fa)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function ha(e) {
  return function() {
    return e;
  };
}
var Me = function() {
  try {
    var e = ue(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
var ya = Me ? function(e, t) {
  return Me(e, "toString", {
    configurable: true,
    enumerable: false,
    value: ha(t),
    writable: true
  });
} : Ur;
var ga = ya;
var va = pa(ga);
function ma(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== false; )
    ;
  return e;
}
var ba = 9007199254740991;
var _a = /^(?:0|[1-9]\d*)$/;
function wa(e, t) {
  var n = typeof e;
  return t = t ?? ba, !!t && (n == "number" || n != "symbol" && _a.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function bn(e, t, n) {
  t == "__proto__" && Me ? Me(e, t, {
    configurable: true,
    enumerable: true,
    value: n,
    writable: true
  }) : e[t] = n;
}
function _n(e, t) {
  return e === t || e !== e && t !== t;
}
var Oa = Object.prototype;
var $a = Oa.hasOwnProperty;
function wn(e, t, n) {
  var r = e[t];
  (!($a.call(e, t) && _n(r, n)) || n === void 0 && !(t in e)) && bn(e, t, n);
}
function Pe(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var o = -1, i = t.length; ++o < i; ) {
    var s = t[o], l = r ? r(n[s], e[s], s, n, e) : void 0;
    l === void 0 && (l = e[s]), a ? bn(n, s, l) : wn(n, s, l);
  }
  return n;
}
var Bt = Math.max;
function Ta(e, t, n) {
  return t = Bt(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, a = -1, o = Bt(r.length - t, 0), i = Array(o); ++a < o; )
      i[a] = r[t + a];
    a = -1;
    for (var s = Array(t + 1); ++a < t; )
      s[a] = r[a];
    return s[t] = n(i), la(e, this, s);
  };
}
var Aa = 9007199254740991;
function On(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Aa;
}
function $n(e) {
  return e != null && On(e.length) && !we(e);
}
var xa = Object.prototype;
function ct(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || xa;
  return e === n;
}
function ja(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Sa = "[object Arguments]";
function Nt(e) {
  return oe(e) && ie(e) == Sa;
}
var Tn = Object.prototype;
var Pa = Tn.hasOwnProperty;
var Fa = Tn.propertyIsEnumerable;
var An = Nt(/* @__PURE__ */ function() {
  return arguments;
}()) ? Nt : function(e) {
  return oe(e) && Pa.call(e, "callee") && !Fa.call(e, "callee");
};
function Ia() {
  return false;
}
var xn = typeof exports == "object" && exports && !exports.nodeType && exports;
var qt = xn && typeof module == "object" && module && !module.nodeType && module;
var Ea = qt && qt.exports === xn;
var Vt = Ea ? U.Buffer : void 0;
var Ca = Vt ? Vt.isBuffer : void 0;
var jn = Ca || Ia;
var Ba = "[object Arguments]";
var Na = "[object Array]";
var qa = "[object Boolean]";
var Va = "[object Date]";
var Ma = "[object Error]";
var ka = "[object Function]";
var Da = "[object Map]";
var Ra = "[object Number]";
var za = "[object Object]";
var La = "[object RegExp]";
var Ua = "[object Set]";
var Ha = "[object String]";
var Ka = "[object WeakMap]";
var Wa = "[object ArrayBuffer]";
var Ga = "[object DataView]";
var Za = "[object Float32Array]";
var Ya = "[object Float64Array]";
var Xa = "[object Int8Array]";
var Ja = "[object Int16Array]";
var Qa = "[object Int32Array]";
var ei = "[object Uint8Array]";
var ti = "[object Uint8ClampedArray]";
var ni = "[object Uint16Array]";
var ri = "[object Uint32Array]";
var F = {};
F[Za] = F[Ya] = F[Xa] = F[Ja] = F[Qa] = F[ei] = F[ti] = F[ni] = F[ri] = true;
F[Ba] = F[Na] = F[Wa] = F[qa] = F[Ga] = F[Va] = F[Ma] = F[ka] = F[Da] = F[Ra] = F[za] = F[La] = F[Ua] = F[Ha] = F[Ka] = false;
function ai(e) {
  return oe(e) && On(e.length) && !!F[ie(e)];
}
function dt(e) {
  return function(t) {
    return e(t);
  };
}
var Sn = typeof exports == "object" && exports && !exports.nodeType && exports;
var Oe = Sn && typeof module == "object" && module && !module.nodeType && module;
var ii = Oe && Oe.exports === Sn;
var Le = ii && yn.process;
var de = function() {
  try {
    var e = Oe && Oe.require && Oe.require("util").types;
    return e || Le && Le.binding && Le.binding("util");
  } catch {
  }
}();
var Mt = de && de.isTypedArray;
var oi = Mt ? dt(Mt) : ai;
var si = Object.prototype;
var li = si.hasOwnProperty;
function Pn(e, t) {
  var n = se(e), r = !n && An(e), a = !n && !r && jn(e), o = !n && !r && !a && oi(e), i = n || r || a || o, s = i ? ja(e.length, String) : [], l = s.length;
  for (var f in e)
    (t || li.call(e, f)) && !(i && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    wa(f, l))) && s.push(f);
  return s;
}
function Fn(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var ui = Fn(Object.keys, Object);
var fi = Object.prototype;
var ci = fi.hasOwnProperty;
function di(e) {
  if (!ct(e))
    return ui(e);
  var t = [];
  for (var n in Object(e))
    ci.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function pt(e) {
  return $n(e) ? Pn(e) : di(e);
}
function pi(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var hi = Object.prototype;
var yi = hi.hasOwnProperty;
function gi(e) {
  if (!Q(e))
    return pi(e);
  var t = ct(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !yi.call(e, r)) || n.push(r);
  return n;
}
function ht(e) {
  return $n(e) ? Pn(e, true) : gi(e);
}
var vi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var mi = /^\w*$/;
function bi(e, t) {
  if (se(e))
    return false;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || ke(e) ? true : mi.test(e) || !vi.test(e) || t != null && e in Object(t);
}
var xe = ue(Object, "create");
function _i() {
  this.__data__ = xe ? xe(null) : {}, this.size = 0;
}
function wi(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Oi = "__lodash_hash_undefined__";
var $i = Object.prototype;
var Ti = $i.hasOwnProperty;
function Ai(e) {
  var t = this.__data__;
  if (xe) {
    var n = t[e];
    return n === Oi ? void 0 : n;
  }
  return Ti.call(t, e) ? t[e] : void 0;
}
var xi = Object.prototype;
var ji = xi.hasOwnProperty;
function Si(e) {
  var t = this.__data__;
  return xe ? t[e] !== void 0 : ji.call(t, e);
}
var Pi = "__lodash_hash_undefined__";
function Fi(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = xe && t === void 0 ? Pi : t, this;
}
function ae(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ae.prototype.clear = _i;
ae.prototype.delete = wi;
ae.prototype.get = Ai;
ae.prototype.has = Si;
ae.prototype.set = Fi;
function Ii() {
  this.__data__ = [], this.size = 0;
}
function De(e, t) {
  for (var n = e.length; n--; )
    if (_n(e[n][0], t))
      return n;
  return -1;
}
var Ei = Array.prototype;
var Ci = Ei.splice;
function Bi(e) {
  var t = this.__data__, n = De(t, e);
  if (n < 0)
    return false;
  var r = t.length - 1;
  return n == r ? t.pop() : Ci.call(t, n, 1), --this.size, true;
}
function Ni(e) {
  var t = this.__data__, n = De(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function qi(e) {
  return De(this.__data__, e) > -1;
}
function Vi(e, t) {
  var n = this.__data__, r = De(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function X(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
X.prototype.clear = Ii;
X.prototype.delete = Bi;
X.prototype.get = Ni;
X.prototype.has = qi;
X.prototype.set = Vi;
var je = ue(U, "Map");
function Mi() {
  this.size = 0, this.__data__ = {
    hash: new ae(),
    map: new (je || X)(),
    string: new ae()
  };
}
function ki(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Re(e, t) {
  var n = e.__data__;
  return ki(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Di(e) {
  var t = Re(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Ri(e) {
  return Re(this, e).get(e);
}
function zi(e) {
  return Re(this, e).has(e);
}
function Li(e, t) {
  var n = Re(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function ee(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ee.prototype.clear = Mi;
ee.prototype.delete = Di;
ee.prototype.get = Ri;
ee.prototype.has = zi;
ee.prototype.set = Li;
var Ui = "Expected a function";
function yt(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Ui);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], o = n.cache;
    if (o.has(a))
      return o.get(a);
    var i = e.apply(this, r);
    return n.cache = o.set(a, i) || o, i;
  };
  return n.cache = new (yt.Cache || ee)(), n;
}
yt.Cache = ee;
var Hi = 500;
function Ki(e) {
  var t = yt(e, function(r) {
    return n.size === Hi && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Wi = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var Gi = /\\(\\)?/g;
var Zi = Ki(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Wi, function(n, r, a, o) {
    t.push(a ? o.replace(Gi, "$1") : r || n);
  }), t;
});
function Yi(e) {
  return e == null ? "" : mn(e);
}
function gt(e, t) {
  return se(e) ? e : bi(e, t) ? [e] : Zi(Yi(e));
}
var Xi = 1 / 0;
function In(e) {
  if (typeof e == "string" || ke(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Xi ? "-0" : t;
}
function Ji(e, t) {
  t = gt(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[In(t[n++])];
  return n && n == r ? e : void 0;
}
function vt(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var kt = Z ? Z.isConcatSpreadable : void 0;
function Qi(e) {
  return se(e) || An(e) || !!(kt && e && e[kt]);
}
function En(e, t, n, r, a) {
  var o = -1, i = e.length;
  for (n || (n = Qi), a || (a = []); ++o < i; ) {
    var s = e[o];
    t > 0 && n(s) ? t > 1 ? En(s, t - 1, n, r, a) : vt(a, s) : r || (a[a.length] = s);
  }
  return a;
}
function eo(e) {
  var t = e == null ? 0 : e.length;
  return t ? En(e, 1) : [];
}
function to(e) {
  return va(Ta(e, void 0, eo), e + "");
}
var mt = Fn(Object.getPrototypeOf, Object);
var no = "[object Object]";
var ro = Function.prototype;
var ao = Object.prototype;
var Cn = ro.toString;
var io = ao.hasOwnProperty;
var oo = Cn.call(Object);
function so(e) {
  if (!oe(e) || ie(e) != no)
    return false;
  var t = mt(e);
  if (t === null)
    return true;
  var n = io.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Cn.call(n) == oo;
}
function lo(e, t, n) {
  var r = -1, a = e.length;
  t < 0 && (t = -t > a ? 0 : a + t), n = n > a ? a : n, n < 0 && (n += a), a = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var o = Array(a); ++r < a; )
    o[r] = e[r + t];
  return o;
}
function uo() {
  this.__data__ = new X(), this.size = 0;
}
function fo(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function co(e) {
  return this.__data__.get(e);
}
function po(e) {
  return this.__data__.has(e);
}
var ho = 200;
function yo(e, t) {
  var n = this.__data__;
  if (n instanceof X) {
    var r = n.__data__;
    if (!je || r.length < ho - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new ee(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function he(e) {
  var t = this.__data__ = new X(e);
  this.size = t.size;
}
he.prototype.clear = uo;
he.prototype.delete = fo;
he.prototype.get = co;
he.prototype.has = po;
he.prototype.set = yo;
function go(e, t) {
  return e && Pe(t, pt(t), e);
}
function vo(e, t) {
  return e && Pe(t, ht(t), e);
}
var Bn = typeof exports == "object" && exports && !exports.nodeType && exports;
var Dt = Bn && typeof module == "object" && module && !module.nodeType && module;
var mo = Dt && Dt.exports === Bn;
var Rt = mo ? U.Buffer : void 0;
var zt = Rt ? Rt.allocUnsafe : void 0;
function bo(e, t) {
  if (t)
    return e.slice();
  var n = e.length, r = zt ? zt(n) : new e.constructor(n);
  return e.copy(r), r;
}
function _o(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, o = []; ++n < r; ) {
    var i = e[n];
    t(i, n, e) && (o[a++] = i);
  }
  return o;
}
function Nn() {
  return [];
}
var wo = Object.prototype;
var Oo = wo.propertyIsEnumerable;
var Lt = Object.getOwnPropertySymbols;
var bt = Lt ? function(e) {
  return e == null ? [] : (e = Object(e), _o(Lt(e), function(t) {
    return Oo.call(e, t);
  }));
} : Nn;
function $o(e, t) {
  return Pe(e, bt(e), t);
}
var To = Object.getOwnPropertySymbols;
var Ao = To ? function(e) {
  for (var t = []; e; )
    vt(t, bt(e)), e = mt(e);
  return t;
} : Nn;
var qn = Ao;
function xo(e, t) {
  return Pe(e, qn(e), t);
}
function Vn(e, t, n) {
  var r = t(e);
  return se(e) ? r : vt(r, n(e));
}
function jo(e) {
  return Vn(e, pt, bt);
}
function Mn(e) {
  return Vn(e, ht, qn);
}
var Ye = ue(U, "DataView");
var Xe = ue(U, "Promise");
var Je = ue(U, "Set");
var Ut = "[object Map]";
var So = "[object Object]";
var Ht = "[object Promise]";
var Kt = "[object Set]";
var Wt = "[object WeakMap]";
var Gt = "[object DataView]";
var Po = le(Ye);
var Fo = le(je);
var Io = le(Xe);
var Eo = le(Je);
var Co = le(Ze);
var te = ie;
(Ye && te(new Ye(new ArrayBuffer(1))) != Gt || je && te(new je()) != Ut || Xe && te(Xe.resolve()) != Ht || Je && te(new Je()) != Kt || Ze && te(new Ze()) != Wt) && (te = function(e) {
  var t = ie(e), n = t == So ? e.constructor : void 0, r = n ? le(n) : "";
  if (r)
    switch (r) {
      case Po:
        return Gt;
      case Fo:
        return Ut;
      case Io:
        return Ht;
      case Eo:
        return Kt;
      case Co:
        return Wt;
    }
  return t;
});
var _t = te;
var Bo = Object.prototype;
var No = Bo.hasOwnProperty;
function qo(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && No.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var Zt = U.Uint8Array;
function wt(e) {
  var t = new e.constructor(e.byteLength);
  return new Zt(t).set(new Zt(e)), t;
}
function Vo(e, t) {
  var n = t ? wt(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var Mo = /\w*$/;
function ko(e) {
  var t = new e.constructor(e.source, Mo.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var Yt = Z ? Z.prototype : void 0;
var Xt = Yt ? Yt.valueOf : void 0;
function Do(e) {
  return Xt ? Object(Xt.call(e)) : {};
}
function Ro(e, t) {
  var n = t ? wt(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var zo = "[object Boolean]";
var Lo = "[object Date]";
var Uo = "[object Map]";
var Ho = "[object Number]";
var Ko = "[object RegExp]";
var Wo = "[object Set]";
var Go = "[object String]";
var Zo = "[object Symbol]";
var Yo = "[object ArrayBuffer]";
var Xo = "[object DataView]";
var Jo = "[object Float32Array]";
var Qo = "[object Float64Array]";
var es = "[object Int8Array]";
var ts = "[object Int16Array]";
var ns = "[object Int32Array]";
var rs = "[object Uint8Array]";
var as = "[object Uint8ClampedArray]";
var is = "[object Uint16Array]";
var os = "[object Uint32Array]";
function ss(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case Yo:
      return wt(e);
    case zo:
    case Lo:
      return new r(+e);
    case Xo:
      return Vo(e, n);
    case Jo:
    case Qo:
    case es:
    case ts:
    case ns:
    case rs:
    case as:
    case is:
    case os:
      return Ro(e, n);
    case Uo:
      return new r();
    case Ho:
    case Go:
      return new r(e);
    case Ko:
      return ko(e);
    case Wo:
      return new r();
    case Zo:
      return Do(e);
  }
}
function ls(e) {
  return typeof e.constructor == "function" && !ct(e) ? sa(mt(e)) : {};
}
var us = "[object Map]";
function fs(e) {
  return oe(e) && _t(e) == us;
}
var Jt = de && de.isMap;
var cs = Jt ? dt(Jt) : fs;
var ds = "[object Set]";
function ps(e) {
  return oe(e) && _t(e) == ds;
}
var Qt = de && de.isSet;
var hs = Qt ? dt(Qt) : ps;
var ys = 1;
var gs = 2;
var vs = 4;
var kn = "[object Arguments]";
var ms = "[object Array]";
var bs = "[object Boolean]";
var _s = "[object Date]";
var ws = "[object Error]";
var Dn = "[object Function]";
var Os = "[object GeneratorFunction]";
var $s = "[object Map]";
var Ts = "[object Number]";
var Rn = "[object Object]";
var As = "[object RegExp]";
var xs = "[object Set]";
var js = "[object String]";
var Ss = "[object Symbol]";
var Ps = "[object WeakMap]";
var Fs = "[object ArrayBuffer]";
var Is = "[object DataView]";
var Es = "[object Float32Array]";
var Cs = "[object Float64Array]";
var Bs = "[object Int8Array]";
var Ns = "[object Int16Array]";
var qs = "[object Int32Array]";
var Vs = "[object Uint8Array]";
var Ms = "[object Uint8ClampedArray]";
var ks = "[object Uint16Array]";
var Ds = "[object Uint32Array]";
var P = {};
P[kn] = P[ms] = P[Fs] = P[Is] = P[bs] = P[_s] = P[Es] = P[Cs] = P[Bs] = P[Ns] = P[qs] = P[$s] = P[Ts] = P[Rn] = P[As] = P[xs] = P[js] = P[Ss] = P[Vs] = P[Ms] = P[ks] = P[Ds] = true;
P[ws] = P[Dn] = P[Ps] = false;
function Ee(e, t, n, r, a, o) {
  var i, s = t & ys, l = t & gs, f = t & vs;
  if (n && (i = a ? n(e, r, a, o) : n(e)), i !== void 0)
    return i;
  if (!Q(e))
    return e;
  var p = se(e);
  if (p) {
    if (i = qo(e), !s)
      return ua(e, i);
  } else {
    var y = _t(e), w = y == Dn || y == Os;
    if (jn(e))
      return bo(e, s);
    if (y == Rn || y == kn || w && !a) {
      if (i = l || w ? {} : ls(e), !s)
        return l ? xo(e, vo(i, e)) : $o(e, go(i, e));
    } else {
      if (!P[y])
        return a ? e : {};
      i = ss(e, y, s);
    }
  }
  o || (o = new he());
  var b = o.get(e);
  if (b)
    return b;
  o.set(e, i), hs(e) ? e.forEach(function(c) {
    i.add(Ee(c, t, n, c, e, o));
  }) : cs(e) && e.forEach(function(c, u) {
    i.set(u, Ee(c, t, n, u, e, o));
  });
  var x = f ? l ? Mn : jo : l ? ht : pt, h2 = p ? void 0 : x(e);
  return ma(h2 || e, function(c, u) {
    h2 && (u = c, c = e[u]), wn(i, u, Ee(c, t, n, u, e, o));
  }), i;
}
var Ue = function() {
  return U.Date.now();
};
var Rs = "Expected a function";
var zs = Math.max;
var Ls = Math.min;
function Qe(e, t, n) {
  var r, a, o, i, s, l, f = 0, p = false, y = false, w = true;
  if (typeof e != "function")
    throw new TypeError(Rs);
  t = It(t) || 0, Q(n) && (p = !!n.leading, y = "maxWait" in n, o = y ? zs(It(n.maxWait) || 0, t) : o, w = "trailing" in n ? !!n.trailing : w);
  function b(d) {
    var m = r, A = a;
    return r = a = void 0, f = d, i = e.apply(A, m), i;
  }
  function x(d) {
    return f = d, s = setTimeout(u, t), p ? b(d) : i;
  }
  function h2(d) {
    var m = d - l, A = d - f, E = t - m;
    return y ? Ls(E, o - A) : E;
  }
  function c(d) {
    var m = d - l, A = d - f;
    return l === void 0 || m >= t || m < 0 || y && A >= o;
  }
  function u() {
    var d = Ue();
    if (c(d))
      return g(d);
    s = setTimeout(u, h2(d));
  }
  function g(d) {
    return s = void 0, w && r ? b(d) : (r = a = void 0, i);
  }
  function v() {
    s !== void 0 && clearTimeout(s), f = 0, r = l = a = s = void 0;
  }
  function _() {
    return s === void 0 ? i : g(Ue());
  }
  function O() {
    var d = Ue(), m = c(d);
    if (r = arguments, a = this, l = d, m) {
      if (s === void 0)
        return x(l);
      if (y)
        return clearTimeout(s), s = setTimeout(u, t), b(l);
    }
    return s === void 0 && (s = setTimeout(u, t)), i;
  }
  return O.cancel = v, O.flush = _, O;
}
function Us(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
function Hs(e, t) {
  return t.length < 2 ? e : Ji(e, lo(t, 0, -1));
}
function en(e) {
  return e == null;
}
function Ks(e, t) {
  return t = gt(t, e), e = Hs(e, t), e == null || delete e[In(Us(t))];
}
function Ws(e) {
  return so(e) ? void 0 : e;
}
var Gs = 1;
var Zs = 2;
var Ys = 4;
var Xs = to(function(e, t) {
  var n = {};
  if (e == null)
    return n;
  var r = false;
  t = vn(t, function(o) {
    return o = gt(o, e), r || (r = o.length > 1), o;
  }), Pe(e, Mn(e), n), r && (n = Ee(n, Gs | Zs | Ys, Ws));
  for (var a = t.length; a--; )
    Ks(n, t[a]);
  return n;
});
var L = defineComponent({
  name: "hc-icon",
  inheritAttrs: false,
  __name: "Icon",
  props: {
    border: { type: Boolean },
    fixedWidth: { type: Boolean },
    flip: {},
    icon: {},
    mask: {},
    maskId: {},
    listItem: { type: Boolean },
    pull: {},
    pulse: { type: Boolean },
    rotation: {},
    swapOpacity: { type: Boolean },
    size: {},
    spin: { type: Boolean },
    transform: {},
    symbol: { type: [Boolean, String] },
    title: {},
    titleId: {},
    inverse: { type: Boolean },
    bounce: { type: Boolean },
    shake: { type: Boolean },
    beat: { type: Boolean },
    fade: { type: Boolean },
    beatFade: { type: Boolean },
    spinPulse: { type: Boolean },
    spinReverse: { type: Boolean },
    type: {},
    color: {}
  },
  setup(e) {
    const t = e, n = computed(() => Xs(t, ["type", "color"])), r = computed(() => t.color ? { color: t.color } : {});
    return (a, o) => (openBlock(), createElementBlock("i", mergeProps({
      class: ["hc-icon", { [`hc-icon--${a.type}`]: a.type }],
      style: r.value
    }, a.$attrs), [
      createVNode(unref(Tr), normalizeProps(guardReactiveProps(n.value)), null, 16)
    ], 16));
  }
});
var Js = ["disabled", "autofocus", "type"];
var Qs = defineComponent({
  name: "hc-button",
  __name: "Button",
  props: {
    type: {},
    size: {},
    plain: { type: Boolean },
    round: { type: Boolean },
    circle: { type: Boolean },
    disabled: { type: Boolean },
    nativeType: { default: "button" },
    autofocus: { type: Boolean },
    width: {},
    height: {},
    icon: {},
    loading: { type: Boolean }
  },
  setup(e, { expose: t }) {
    const n = ref();
    return t({
      ref: n
    }), (r, a) => (openBlock(), createElementBlock("button", {
      ref_key: "_ref",
      ref: n,
      class: normalizeClass(["hc-button", {
        [`hc-button--${r.type}`]: r.type,
        [`hc-button--${r.size}`]: r.size,
        plain: r.plain,
        round: r.round,
        circle: r.circle,
        disabled: r.disabled,
        loading: r.loading
      }]),
      style: normalizeStyle({ width: r.width + "px", height: r.height + "px" }),
      disabled: r.disabled || r.loading,
      autofocus: r.autofocus,
      type: r.nativeType
    }, [
      r.loading ? (openBlock(), createBlock(L, {
        key: 0,
        icon: "spinner",
        spin: ""
      })) : createCommentVNode("", true),
      r.icon ? (openBlock(), createBlock(L, {
        key: 1,
        icon: r.icon
      }, null, 8, ["icon"])) : createCommentVNode("", true),
      createBaseVNode("span", null, [
        renderSlot(r.$slots, "default")
      ])
    ], 14, Js));
  }
});
var zn = Symbol("collapseContextKey");
var el = { class: "hc-collapse" };
var tl = defineComponent({
  name: "hc-collapse",
  __name: "Collapse",
  props: {
    modelValue: {},
    accordion: { type: Boolean }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const n = e, r = t, a = ref(n.modelValue);
    return watch(
      () => n.modelValue,
      () => {
        a.value = n.modelValue;
      }
    ), n.accordion && a.value.length > 1 && console.warn("accordion mode should only have one acitve item"), provide(zn, {
      activeNames: a,
      handleItemClick: (i) => {
        let s = [...a.value];
        if (n.accordion)
          s = [a.value[0] === i ? "" : i], a.value = s;
        else {
          const l = s.indexOf(i);
          l > -1 ? s.splice(l, 1) : s.push(i), a.value = s;
        }
        r("update:modelValue", s), r("change", s);
      }
    }), (i, s) => (openBlock(), createElementBlock("div", el, [
      renderSlot(i.$slots, "default")
    ]));
  }
});
var nl = ["id"];
var rl = { class: "hc-collapse-item__wrapper" };
var al = ["id"];
var il = defineComponent({
  name: "hc-collapseItem",
  __name: "CollapseItem",
  props: {
    name: {},
    title: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e, n = inject(zn), r = computed(() => n == null ? void 0 : n.activeNames.value.includes(t.name)), a = () => {
      t.disabled || n == null || n.handleItemClick(t.name);
    }, o = {
      beforeEnter(i) {
        i.style.height = "0px", i.style.overflow = "hidden";
      },
      enter(i) {
        i.style.height = `${i.scrollHeight}px`;
      },
      afterEnter(i) {
        i.style.height = "", i.style.overflow = "";
      },
      beforeLeave(i) {
        i.style.height = `${i.scrollHeight}px`, i.style.overflow = "hidden";
      },
      leave(i) {
        i.style.height = "0px";
      },
      afterLeave(i) {
        i.style.height = "", i.style.overflow = "";
      }
    };
    return (i, s) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["hc-collapse-item", {
        disabled: i.disabled
      }])
    }, [
      createBaseVNode("div", {
        class: normalizeClass(["hc-collapse-item__header", {
          disabled: i.disabled,
          active: r.value
        }]),
        id: `item-header-${i.name}`,
        onClick: a
      }, [
        renderSlot(i.$slots, "title", {}, () => [
          createTextVNode(toDisplayString(i.title), 1)
        ]),
        createVNode(L, {
          icon: "angle-right",
          class: "header-angle"
        })
      ], 10, nl),
      createVNode(Transition, mergeProps({ name: "slide" }, toHandlers(o)), {
        default: withCtx(() => [
          withDirectives(createBaseVNode("div", rl, [
            createBaseVNode("div", {
              class: "hc-collapse-item__content",
              id: `item-header-${i.name}`
            }, [
              renderSlot(i.$slots, "default")
            ], 8, al)
          ], 512), [
            [vShow, r.value]
          ])
        ]),
        _: 3
      }, 16)
    ], 2));
  }
});
var ol = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      require: true
    }
  },
  setup(e) {
    return () => e.vNode;
  }
});
var Ot = ol;
var tn = ref(0);
var sl = (e = 2e3) => {
  const t = ref(e), n = computed(() => tn.value + t.value);
  return {
    currentZIndex: n,
    nextZIndex: () => (tn.value++, n.value),
    initialZIndex: t
  };
};
var ll = 1;
var ne = reactive([]);
var ju = (e) => {
  const t = `message_${ll++}`, { nextZIndex: n } = sl(), r = document.createElement("div"), a = () => {
    const p = ne.findIndex((y) => y.id == t);
    p != -1 && (ne.splice(p, 1), render(null, r));
  }, o = () => {
    const p = ne.find((y) => y.id == t);
    p && (p.vm.exposed.visible.value = false);
  }, i = {
    ...e,
    id: t,
    onDestory: a,
    zIndex: n()
  }, s = h(Ln, i);
  render(s, r), document.body.appendChild(r.firstElementChild);
  const l = s.component, f = {
    id: t,
    vnode: s,
    props: i,
    vm: l,
    destory: o
  };
  return ne.push(f), f;
};
var ul = (e) => {
  const t = ne.findIndex((n) => n.id == e);
  return t <= 0 ? 0 : ne[t - 1].vm.exposed.bottomOffset.value;
};
var Su = () => {
  ne.forEach((e) => {
    e.destory();
  });
};
function fl(e, t, n) {
  isRef(e) ? watch(e, (r, a) => {
    a == null || a.removeEventListener(t, n), r == null || r.addEventListener(t, n);
  }) : onMounted(() => {
    e.addEventListener(t, n);
  }), onBeforeMount(() => {
    unref(e).removeEventListener(t, n);
  });
}
var cl = { class: "hc-message__content" };
var dl = {
  key: 0,
  class: "hc-message__close"
};
var Ln = defineComponent({
  name: "hc-message",
  __name: "Message",
  props: {
    message: {},
    duration: { default: 3e3 },
    showClose: { type: Boolean },
    type: { default: "info" },
    onDestory: {},
    offset: { default: 20 },
    zIndex: {},
    id: {},
    transitionName: { default: "fade-up" }
  },
  setup(e, { expose: t }) {
    let n;
    const r = e, a = () => {
      r.duration != 0 && (n = setTimeout(() => {
        i.value = false;
      }, r.duration));
    };
    function o() {
      clearTimeout(n);
    }
    const i = ref(false), s = ref(), l = ref(0), f = computed(() => ul(r.id)), p = computed(() => r.offset + f.value), y = computed(() => l.value + p.value), w = computed(() => ({
      top: p.value + "px",
      zIndex: r.zIndex
    }));
    onMounted(async () => {
      i.value = true, a();
    });
    function b(c) {
      c.code == "Escape" && (i.value = false);
    }
    fl(document, "keydown", b);
    function x() {
      r.onDestory();
    }
    function h2() {
      l.value = s.value.getBoundingClientRect().height;
    }
    return t({
      bottomOffset: y,
      visible: i
    }), (c, u) => (openBlock(), createBlock(Transition, {
      name: c.transitionName,
      onAfterLeave: x,
      onEnter: h2
    }, {
      default: withCtx(() => [
        withDirectives(createBaseVNode("div", {
          class: normalizeClass(["hc-message", {
            [`hc-message--${c.type}`]: c.type,
            "is-close": c.showClose
          }]),
          role: "alert",
          ref_key: "messageRef",
          ref: s,
          style: normalizeStyle(w.value),
          onMouseenter: o,
          onMouseleave: a
        }, [
          createBaseVNode("div", cl, [
            renderSlot(c.$slots, "default", {}, () => [
              c.message ? (openBlock(), createBlock(unref(Ot), {
                key: 0,
                vNode: c.message
              }, null, 8, ["vNode"])) : createCommentVNode("", true)
            ])
          ]),
          c.showClose ? (openBlock(), createElementBlock("div", dl, [
            createVNode(L, {
              icon: "xmark",
              onClick: u[0] || (u[0] = withModifiers((g) => i.value = false, ["stop"]))
            })
          ])) : createCommentVNode("", true)
        ], 38), [
          [vShow, i.value]
        ])
      ]),
      _: 3
    }, 8, ["name"]));
  }
});
var pl = (e, t) => {
  const n = (r) => {
    e.value && r.target && (e.value.contains(r.target) || t(r));
  };
  onMounted(() => {
    document.addEventListener("click", n);
  }), onUnmounted(() => {
    document.removeEventListener("click", n);
  });
};
var hl = createBaseVNode("div", {
  id: "arrow",
  "data-popper-arrow": ""
}, null, -1);
var $t = defineComponent({
  name: "hc-tooltip",
  __name: "Tooltip",
  props: {
    content: {},
    trigger: { default: "hover" },
    placement: { default: "bottom" },
    manual: { type: Boolean },
    popperOptions: {},
    transition: { default: "fade" },
    openDelay: { default: 0 },
    closeDelay: { default: 0 }
  },
  emits: ["visible-change", "click-outside"],
  setup(e, { expose: t, emit: n }) {
    const r = e, a = n, o = ref(false), i = ref(), s = ref(), l = ref();
    let f = null, p = reactive({}), y = reactive({});
    const w = computed(() => ({
      placement: r.placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 9]
          }
        }
      ],
      ...r.popperOptions
    })), b = () => {
      o.value ? v() : g(), a("visible-change", o.value);
    }, x = () => {
      o.value = true, a("visible-change", true);
    }, h2 = () => {
      o.value = false, a("visible-change", false);
    }, c = Qe(x, r.openDelay), u = Qe(h2, r.closeDelay), g = () => {
      u.cancel(), c();
    }, v = () => {
      c.cancel(), u();
    };
    pl(l, () => {
      r.trigger == "click" && o.value && !r.manual && v(), o.value && a("click-outside", true);
    });
    const _ = () => {
      r.trigger == "hover" ? (p.mouseenter = g, y.mouseleave = v) : r.trigger == "click" && (p.click = b);
    };
    return r.manual || _(), watch(
      () => r.manual,
      (O) => {
        O ? (p = {}, y = {}) : _();
      }
    ), watch(
      () => r.trigger,
      (O, d) => {
        O != d && (p = {}, y = {}, _());
      }
    ), watch(
      o,
      (O) => {
        O && (i.value && s.value ? f = createPopper3(s.value, i.value, w.value) : f == null || f.destroy());
      },
      { flush: "post" }
    ), onMounted(() => {
      f == null || f.destroy();
    }), t({
      show: g,
      hide: v
    }), (O, d) => (openBlock(), createElementBlock("div", mergeProps({ class: "hc-tooltip" }, toHandlers(unref(y), true), {
      ref_key: "popperContainerNode",
      ref: l
    }), [
      createBaseVNode("div", mergeProps({
        class: "hc-tooltip__trigger",
        ref_key: "triggerNode",
        ref: s
      }, toHandlers(unref(p), true)), [
        renderSlot(O.$slots, "default")
      ], 16),
      createVNode(Transition, { name: O.transition }, {
        default: withCtx(() => [
          o.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "hc-tooltip__popper",
            ref_key: "popperNode",
            ref: i
          }, [
            renderSlot(O.$slots, "content", {}, () => [
              createTextVNode(toDisplayString(O.content), 1)
            ]),
            hl
          ], 512)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name"])
    ], 16));
  }
});
var yl = { class: "hc-dropdown" };
var gl = { class: "hc-dropdown__menu" };
var vl = {
  key: 0,
  role: "separator",
  class: "divided-placeholder"
};
var ml = ["id", "onClick"];
var bl = defineComponent({
  name: "hc-dropdown",
  __name: "Dropdown",
  props: {
    menuOptions: {},
    hideAfterClick: { type: Boolean, default: true },
    content: {},
    trigger: {},
    placement: {},
    manual: { type: Boolean },
    popperOptions: {},
    transition: {},
    openDelay: {},
    closeDelay: {}
  },
  emits: ["visible-change", "select"],
  setup(e, { expose: t, emit: n }) {
    const r = e, a = n, o = ref(), i = (l) => {
      a("visible-change", l);
    }, s = (l) => {
      l.disabled || (a("select", l), r.hideAfterClick && o.value.hide());
    };
    return t({
      show: () => o.value.show(),
      hide: () => o.value.hide()
    }), (l, f) => (openBlock(), createElementBlock("div", yl, [
      createVNode($t, {
        trigger: l.trigger,
        placement: l.placement,
        "popper-options": l.popperOptions,
        "open-delay": l.openDelay,
        "close-delay": l.closeDelay,
        manual: l.manual,
        onVisibleChange: i,
        ref_key: "tooltipRef",
        ref: o
      }, {
        content: withCtx(() => [
          createBaseVNode("ul", gl, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(l.menuOptions, (p) => (openBlock(), createElementBlock(Fragment, {
              key: p.key
            }, [
              p.divided ? (openBlock(), createElementBlock("li", vl)) : createCommentVNode("", true),
              createBaseVNode("li", {
                class: normalizeClass(["hc-dropdown__item", {
                  disabled: p.disabled,
                  divided: p.divided
                }]),
                id: `dropdown-item-${p.key}`,
                onClick: (y) => s(p)
              }, [
                createVNode(unref(Ot), {
                  "v-node": p.label
                }, null, 8, ["v-node"])
              ], 10, ml)
            ], 64))), 128))
          ])
        ]),
        default: withCtx(() => [
          renderSlot(l.$slots, "default")
        ]),
        _: 3
      }, 8, ["trigger", "placement", "popper-options", "open-delay", "close-delay", "manual"])
    ]));
  }
});
var Un = Symbol("formContextKey");
var Hn = Symbol("formItemContext");
var _l = { class: "hc-form" };
var wl = defineComponent({
  name: "hc-form",
  __name: "Form",
  props: {
    model: {},
    rules: {}
  },
  setup(e, { expose: t }) {
    const n = e, r = [], a = (f) => {
      f.prop && r.push(f);
    }, o = (f) => {
      r.splice(r.indexOf(f), 1);
    }, i = (f = []) => {
      (f.length > 0 ? r.filter((y) => f.includes(y.prop)) : r).forEach((y) => y.resetField());
    }, s = (f = []) => {
      (f.length > 0 ? r.filter((y) => f.includes(y.prop)) : r).forEach((y) => y.clearValidate());
    }, l = async () => {
      let f = {};
      for (const p of r)
        try {
          await p.validate("");
        } catch (y) {
          f = {
            ...f,
            ...y.fields
          };
        }
      return Object.keys(f).length == 0 ? true : Promise.reject(f);
    };
    return provide(Un, {
      ...n,
      addField: a,
      removeField: o
    }), t({
      validate: l,
      clearValidate: s,
      resetFields: i
    }), (f, p) => (openBlock(), createElementBlock("form", _l, [
      renderSlot(f.$slots, "default")
    ]));
  }
});
function re() {
  return re = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, re.apply(this, arguments);
}
function Ol(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Se(e, t);
}
function et(e) {
  return et = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, et(e);
}
function Se(e, t) {
  return Se = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, a) {
    return r.__proto__ = a, r;
  }, Se(e, t);
}
function $l() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return false;
  if (typeof Proxy == "function")
    return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch {
    return false;
  }
}
function Ce(e, t, n) {
  return $l() ? Ce = Reflect.construct.bind() : Ce = function(a, o, i) {
    var s = [null];
    s.push.apply(s, o);
    var l = Function.bind.apply(a, s), f = new l();
    return i && Se(f, i.prototype), f;
  }, Ce.apply(null, arguments);
}
function Tl(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function tt(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return tt = function(r) {
    if (r === null || !Tl(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, a);
    }
    function a() {
      return Ce(r, arguments, et(this).constructor);
    }
    return a.prototype = Object.create(r.prototype, {
      constructor: {
        value: a,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }), Se(a, r);
  }, tt(e);
}
var Al = /%[sdj%]/g;
var Kn = function() {
};
typeof process < "u" && process.env && true && typeof window < "u" && typeof document < "u" && (Kn = function(t, n) {
  typeof console < "u" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING > "u" && n.every(function(r) {
    return typeof r == "string";
  }) && console.warn(t, n);
});
function nt(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(n) {
    var r = n.field;
    t[r] = t[r] || [], t[r].push(n);
  }), t;
}
function k(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var a = 0, o = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var i = e.replace(Al, function(s) {
      if (s === "%%")
        return "%";
      if (a >= o)
        return s;
      switch (s) {
        case "%s":
          return String(n[a++]);
        case "%d":
          return Number(n[a++]);
        case "%j":
          try {
            return JSON.stringify(n[a++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return s;
      }
    });
    return i;
  }
  return e;
}
function xl(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function C(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || xl(t) && typeof e == "string" && !e);
}
function jl(e, t, n) {
  var r = [], a = 0, o = e.length;
  function i(s) {
    r.push.apply(r, s || []), a++, a === o && n(r);
  }
  e.forEach(function(s) {
    t(s, i);
  });
}
function nn(e, t, n) {
  var r = 0, a = e.length;
  function o(i) {
    if (i && i.length) {
      n(i);
      return;
    }
    var s = r;
    r = r + 1, s < a ? t(e[s], o) : n([]);
  }
  o([]);
}
function Sl(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var rn = function(e) {
  Ol(t, e);
  function t(n, r) {
    var a;
    return a = e.call(this, "Async Validation Error") || this, a.errors = n, a.fields = r, a;
  }
  return t;
}(tt(Error));
function Pl(e, t, n, r, a) {
  if (t.first) {
    var o = new Promise(function(w, b) {
      var x = function(u) {
        return r(u), u.length ? b(new rn(u, nt(u))) : w(a);
      }, h2 = Sl(e);
      nn(h2, n, x);
    });
    return o.catch(function(w) {
      return w;
    }), o;
  }
  var i = t.firstFields === true ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), l = s.length, f = 0, p = [], y = new Promise(function(w, b) {
    var x = function(c) {
      if (p.push.apply(p, c), f++, f === l)
        return r(p), p.length ? b(new rn(p, nt(p))) : w(a);
    };
    s.length || (r(p), w(a)), s.forEach(function(h2) {
      var c = e[h2];
      i.indexOf(h2) !== -1 ? nn(c, n, x) : jl(c, n, x);
    });
  });
  return y.catch(function(w) {
    return w;
  }), y;
}
function Fl(e) {
  return !!(e && e.message !== void 0);
}
function Il(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null)
      return n;
    n = n[t[r]];
  }
  return n;
}
function an(e, t) {
  return function(n) {
    var r;
    return e.fullFields ? r = Il(t, e.fullFields) : r = t[n.field || e.fullField], Fl(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || e.fullField
    };
  };
}
function on(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object" ? e[n] = re({}, e[n], r) : e[n] = r;
      }
  }
  return e;
}
var Wn = function(t, n, r, a, o, i) {
  t.required && (!r.hasOwnProperty(t.field) || C(n, i || t.type)) && a.push(k(o.messages.required, t.fullField));
};
var El = function(t, n, r, a, o) {
  (/^\s+$/.test(n) || n === "") && a.push(k(o.messages.whitespace, t.fullField));
};
var Ie;
var Cl = function() {
  if (Ie)
    return Ie;
  var e = "[a-fA-F\\d:]", t = function(_) {
    return _ && _.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
  }, n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", r = "[a-fA-F\\d]{1,4}", a = (`
(?:
(?:` + r + ":){7}(?:" + r + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + r + ":){6}(?:" + n + "|:" + r + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + r + ":){5}(?::" + n + "|(?::" + r + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + r + ":){4}(?:(?::" + r + "){0,1}:" + n + "|(?::" + r + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + r + ":){3}(?:(?::" + r + "){0,2}:" + n + "|(?::" + r + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + r + ":){2}(?:(?::" + r + "){0,3}:" + n + "|(?::" + r + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + r + ":){1}(?:(?::" + r + "){0,4}:" + n + "|(?::" + r + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + r + "){0,5}:" + n + "|(?::" + r + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), o = new RegExp("(?:^" + n + "$)|(?:^" + a + "$)"), i = new RegExp("^" + n + "$"), s = new RegExp("^" + a + "$"), l = function(_) {
    return _ && _.exact ? o : new RegExp("(?:" + t(_) + n + t(_) + ")|(?:" + t(_) + a + t(_) + ")", "g");
  };
  l.v4 = function(v) {
    return v && v.exact ? i : new RegExp("" + t(v) + n + t(v), "g");
  }, l.v6 = function(v) {
    return v && v.exact ? s : new RegExp("" + t(v) + a + t(v), "g");
  };
  var f = "(?:(?:[a-z]+:)?//)", p = "(?:\\S+(?::\\S*)?@)?", y = l.v4().source, w = l.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", x = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", h2 = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", c = "(?::\\d{2,5})?", u = '(?:[/?#][^\\s"]*)?', g = "(?:" + f + "|www\\.)" + p + "(?:localhost|" + y + "|" + w + "|" + b + x + h2 + ")" + c + u;
  return Ie = new RegExp("(?:^" + g + "$)", "i"), Ie;
};
var sn = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var me = {
  integer: function(t) {
    return me.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return me.number(t) && !me.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return true;
    try {
      return !!new RegExp(t);
    } catch {
      return false;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? false : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !me.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(sn.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Cl());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(sn.hex);
  }
};
var Bl = function(t, n, r, a, o) {
  if (t.required && n === void 0) {
    Wn(t, n, r, a, o);
    return;
  }
  var i = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  i.indexOf(s) > -1 ? me[s](n) || a.push(k(o.messages.types[s], t.fullField, t.type)) : s && typeof n !== t.type && a.push(k(o.messages.types[s], t.fullField, t.type));
};
var Nl = function(t, n, r, a, o) {
  var i = typeof t.len == "number", s = typeof t.min == "number", l = typeof t.max == "number", f = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, p = n, y = null, w = typeof n == "number", b = typeof n == "string", x = Array.isArray(n);
  if (w ? y = "number" : b ? y = "string" : x && (y = "array"), !y)
    return false;
  x && (p = n.length), b && (p = n.replace(f, "_").length), i ? p !== t.len && a.push(k(o.messages[y].len, t.fullField, t.len)) : s && !l && p < t.min ? a.push(k(o.messages[y].min, t.fullField, t.min)) : l && !s && p > t.max ? a.push(k(o.messages[y].max, t.fullField, t.max)) : s && l && (p < t.min || p > t.max) && a.push(k(o.messages[y].range, t.fullField, t.min, t.max));
};
var fe = "enum";
var ql = function(t, n, r, a, o) {
  t[fe] = Array.isArray(t[fe]) ? t[fe] : [], t[fe].indexOf(n) === -1 && a.push(k(o.messages[fe], t.fullField, t[fe].join(", ")));
};
var Vl = function(t, n, r, a, o) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || a.push(k(o.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var i = new RegExp(t.pattern);
      i.test(n) || a.push(k(o.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
};
var T = {
  required: Wn,
  whitespace: El,
  type: Bl,
  range: Nl,
  enum: ql,
  pattern: Vl
};
var Ml = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n, "string") && !t.required)
      return r();
    T.required(t, n, a, i, o, "string"), C(n, "string") || (T.type(t, n, a, i, o), T.range(t, n, a, i, o), T.pattern(t, n, a, i, o), t.whitespace === true && T.whitespace(t, n, a, i, o));
  }
  r(i);
};
var kl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && T.type(t, n, a, i, o);
  }
  r(i);
};
var Dl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (n === "" && (n = void 0), C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && (T.type(t, n, a, i, o), T.range(t, n, a, i, o));
  }
  r(i);
};
var Rl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && T.type(t, n, a, i, o);
  }
  r(i);
};
var zl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), C(n) || T.type(t, n, a, i, o);
  }
  r(i);
};
var Ll = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && (T.type(t, n, a, i, o), T.range(t, n, a, i, o));
  }
  r(i);
};
var Ul = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && (T.type(t, n, a, i, o), T.range(t, n, a, i, o));
  }
  r(i);
};
var Hl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (n == null && !t.required)
      return r();
    T.required(t, n, a, i, o, "array"), n != null && (T.type(t, n, a, i, o), T.range(t, n, a, i, o));
  }
  r(i);
};
var Kl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && T.type(t, n, a, i, o);
  }
  r(i);
};
var Wl = "enum";
var Gl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o), n !== void 0 && T[Wl](t, n, a, i, o);
  }
  r(i);
};
var Zl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n, "string") && !t.required)
      return r();
    T.required(t, n, a, i, o), C(n, "string") || T.pattern(t, n, a, i, o);
  }
  r(i);
};
var Yl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n, "date") && !t.required)
      return r();
    if (T.required(t, n, a, i, o), !C(n, "date")) {
      var l;
      n instanceof Date ? l = n : l = new Date(n), T.type(t, l, a, i, o), l && T.range(t, l.getTime(), a, i, o);
    }
  }
  r(i);
};
var Xl = function(t, n, r, a, o) {
  var i = [], s = Array.isArray(n) ? "array" : typeof n;
  T.required(t, n, a, i, o, s), r(i);
};
var He = function(t, n, r, a, o) {
  var i = t.type, s = [], l = t.required || !t.required && a.hasOwnProperty(t.field);
  if (l) {
    if (C(n, i) && !t.required)
      return r();
    T.required(t, n, a, s, o, i), C(n, i) || T.type(t, n, a, s, o);
  }
  r(s);
};
var Jl = function(t, n, r, a, o) {
  var i = [], s = t.required || !t.required && a.hasOwnProperty(t.field);
  if (s) {
    if (C(n) && !t.required)
      return r();
    T.required(t, n, a, i, o);
  }
  r(i);
};
var $e = {
  string: Ml,
  method: kl,
  number: Dl,
  boolean: Rl,
  regexp: zl,
  integer: Ll,
  float: Ul,
  array: Hl,
  object: Kl,
  enum: Gl,
  pattern: Zl,
  date: Yl,
  url: He,
  hex: He,
  email: He,
  required: Xl,
  any: Jl
};
function rt() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var at = rt();
var Fe = function() {
  function e(n) {
    this.rules = null, this._messages = at, this.define(n);
  }
  var t = e.prototype;
  return t.define = function(r) {
    var a = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(o) {
      var i = r[o];
      a.rules[o] = Array.isArray(i) ? i : [i];
    });
  }, t.messages = function(r) {
    return r && (this._messages = on(rt(), r)), this._messages;
  }, t.validate = function(r, a, o) {
    var i = this;
    a === void 0 && (a = {}), o === void 0 && (o = function() {
    });
    var s = r, l = a, f = o;
    if (typeof l == "function" && (f = l, l = {}), !this.rules || Object.keys(this.rules).length === 0)
      return f && f(null, s), Promise.resolve(s);
    function p(h2) {
      var c = [], u = {};
      function g(_) {
        if (Array.isArray(_)) {
          var O;
          c = (O = c).concat.apply(O, _);
        } else
          c.push(_);
      }
      for (var v = 0; v < h2.length; v++)
        g(h2[v]);
      c.length ? (u = nt(c), f(c, u)) : f(null, s);
    }
    if (l.messages) {
      var y = this.messages();
      y === at && (y = rt()), on(y, l.messages), l.messages = y;
    } else
      l.messages = this.messages();
    var w = {}, b = l.keys || Object.keys(this.rules);
    b.forEach(function(h2) {
      var c = i.rules[h2], u = s[h2];
      c.forEach(function(g) {
        var v = g;
        typeof v.transform == "function" && (s === r && (s = re({}, s)), u = s[h2] = v.transform(u)), typeof v == "function" ? v = {
          validator: v
        } : v = re({}, v), v.validator = i.getValidationMethod(v), v.validator && (v.field = h2, v.fullField = v.fullField || h2, v.type = i.getType(v), w[h2] = w[h2] || [], w[h2].push({
          rule: v,
          value: u,
          source: s,
          field: h2
        }));
      });
    });
    var x = {};
    return Pl(w, l, function(h2, c) {
      var u = h2.rule, g = (u.type === "object" || u.type === "array") && (typeof u.fields == "object" || typeof u.defaultField == "object");
      g = g && (u.required || !u.required && h2.value), u.field = h2.field;
      function v(d, m) {
        return re({}, m, {
          fullField: u.fullField + "." + d,
          fullFields: u.fullFields ? [].concat(u.fullFields, [d]) : [d]
        });
      }
      function _(d) {
        d === void 0 && (d = []);
        var m = Array.isArray(d) ? d : [d];
        !l.suppressWarning && m.length && e.warning("async-validator:", m), m.length && u.message !== void 0 && (m = [].concat(u.message));
        var A = m.map(an(u, s));
        if (l.first && A.length)
          return x[u.field] = 1, c(A);
        if (!g)
          c(A);
        else {
          if (u.required && !h2.value)
            return u.message !== void 0 ? A = [].concat(u.message).map(an(u, s)) : l.error && (A = [l.error(u, k(l.messages.required, u.field))]), c(A);
          var E = {};
          u.defaultField && Object.keys(h2.value).map(function(H) {
            E[H] = u.defaultField;
          }), E = re({}, E, h2.rule.fields);
          var ye = {};
          Object.keys(E).forEach(function(H) {
            var K = E[H], Gn = Array.isArray(K) ? K : [K];
            ye[H] = Gn.map(v.bind(null, H));
          });
          var ge = new e(ye);
          ge.messages(l.messages), h2.rule.options && (h2.rule.options.messages = l.messages, h2.rule.options.error = l.error), ge.validate(h2.value, h2.rule.options || l, function(H) {
            var K = [];
            A && A.length && K.push.apply(K, A), H && H.length && K.push.apply(K, H), c(K.length ? K : null);
          });
        }
      }
      var O;
      if (u.asyncValidator)
        O = u.asyncValidator(u, h2.value, _, h2.source, l);
      else if (u.validator) {
        try {
          O = u.validator(u, h2.value, _, h2.source, l);
        } catch (d) {
          console.error == null || console.error(d), l.suppressValidatorError || setTimeout(function() {
            throw d;
          }, 0), _(d.message);
        }
        O === true ? _() : O === false ? _(typeof u.message == "function" ? u.message(u.fullField || u.field) : u.message || (u.fullField || u.field) + " fails") : O instanceof Array ? _(O) : O instanceof Error && _(O.message);
      }
      O && O.then && O.then(function() {
        return _();
      }, function(d) {
        return _(d);
      });
    }, function(h2) {
      p(h2);
    }, s);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !$e.hasOwnProperty(r.type))
      throw new Error(k("Unknown rule type %s", r.type));
    return r.type || "string";
  }, t.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var a = Object.keys(r), o = a.indexOf("message");
    return o !== -1 && a.splice(o, 1), a.length === 1 && a[0] === "required" ? $e.required : $e[this.getType(r)] || void 0;
  }, e;
}();
Fe.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  $e[t] = n;
};
Fe.warning = Kn;
Fe.messages = at;
Fe.validators = $e;
var Ql = { class: "hc-form-item__label" };
var eu = { class: "hc-form-item__content" };
var tu = {
  key: 0,
  class: "hc-form-item__error-msg"
};
var nu = defineComponent({
  name: "hc-formItem",
  __name: "FormItem",
  props: {
    label: {},
    prop: {}
  },
  setup(e) {
    const t = e, n = inject(Un), r = reactive({
      state: "init",
      errorMsg: "",
      loading: false
    });
    let a = null;
    const o = computed(() => {
      const b = n == null ? void 0 : n.model;
      return b && t.prop && !en(b[t.prop]) ? b[t.prop] : null;
    }), i = computed(() => {
      const b = n == null ? void 0 : n.rules;
      return b && t.prop && b[t.prop] ? b[t.prop] : [];
    }), s = (b) => {
      const x = i.value;
      return x ? x.filter((h2) => {
        if (!h2.trigger || !b)
          return true;
        if (h2.trigger == b)
          return h2.trigger;
      }) : [];
    }, l = computed(() => i.value.some((b) => b.required)), f = (b) => {
      b instanceof Object && (b = b.type);
      const x = t.prop, h2 = s(b);
      if (h2.length == 0)
        return true;
      if (x) {
        const c = new Fe({
          [x]: h2
        });
        return r.loading = true, c.validate({ [x]: o.value }).then(() => {
          r.state = "success";
        }).catch((u) => {
          const { errors: g, fields: v } = u;
          return r.state = "error", r.errorMsg = g && g.length > 0 && g[0].message || "", Promise.reject(u);
        }).finally(() => {
          r.loading = false;
        });
      }
    }, p = () => {
      r.state = "init", r.loading = false, r.errorMsg = "";
    }, y = () => {
      p();
      const b = n == null ? void 0 : n.model;
      b && t.prop && !en(b[t.prop]) && (b[t.prop] = a);
    }, w = {
      validate: f,
      prop: t.prop || "",
      clearValidate: p,
      resetField: y
    };
    return provide(Hn, w), onMounted(() => {
      t.prop && (n == null || n.addField(w), a = o.value);
    }), onUnmounted(() => {
      n == null || n.removeField(w);
    }), (b, x) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([{
        error: r.state == "error",
        success: r.state == "success",
        loading: r.loading,
        required: l.value
      }, "hc-form-item"])
    }, [
      createBaseVNode("label", Ql, [
        renderSlot(b.$slots, "label"),
        createTextVNode(" " + toDisplayString(b.label), 1)
      ]),
      createBaseVNode("div", eu, [
        renderSlot(b.$slots, "default", { validate: f }),
        r.state == "error" ? (openBlock(), createElementBlock("div", tu, toDisplayString(r.errorMsg), 1)) : createCommentVNode("", true)
      ])
    ], 2));
  }
});
var ru = {
  key: 0,
  class: "hc-input__prepend"
};
var au = { class: "hc-input__wrapper" };
var iu = {
  key: 0,
  class: "hc-input__prefix"
};
var ou = ["type", "disabled", "readonly", "autocomplete", "placeholder", "autofocus", "form"];
var su = {
  key: 1,
  class: "hc-input__append"
};
var lu = ["disabled", "readonly", "autocomplete", "placeholder", "autofocus", "form"];
var uu = defineComponent({
  name: "VkInput",
  inheritAttrs: false,
  __name: "Input",
  props: {
    type: { default: "text" },
    modelValue: {},
    size: {},
    disabled: { type: Boolean },
    clearable: { type: Boolean },
    showPassword: { type: Boolean },
    placeholder: {},
    readonly: { type: Boolean },
    autocomplete: { default: "off" },
    autofocus: { type: Boolean },
    form: {}
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur", "clear"],
  setup(e, { expose: t, emit: n }) {
    const r = e, a = n, o = useAttrs(), i = ref(r.modelValue), s = ref(false), l = ref(false), f = ref(), p = inject(Hn), y = (d) => {
      p == null || p.validate(d);
    }, w = computed(
      () => r.clearable && !r.disabled && !!i.value && s.value
    ), b = computed(
      () => r.showPassword && !r.disabled && !!i.value
    ), x = () => {
      l.value = !l.value;
    }, h2 = () => {
    }, c = async () => {
      await nextTick(), f.value.focus();
    }, u = () => {
      a("update:modelValue", i.value), a("input", i.value), y("input");
    }, g = () => {
      a("change", i.value), y("change");
    }, v = (d) => {
      s.value = true, a("focus", d);
    }, _ = (d) => {
      s.value = false, a("blur", d), y("blur");
    }, O = () => {
      i.value = "", a("update:modelValue", ""), a("clear"), a("input", ""), a("change", "");
    };
    return watch(() => r.modelValue, (d) => {
      i.value = d;
    }), t({
      ref: f
    }), (d, m) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["hc-input", {
        [`hc-input--${d.type}`]: d.type,
        [`hc-input--${d.size}`]: d.size,
        disabled: d.disabled,
        prepend: d.$slots.prepend,
        append: d.$slots.append,
        prefix: d.$slots.prefix,
        suffix: d.$slots.suffix,
        focus: s.value
      }])
    }, [
      d.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        d.$slots.prepend ? (openBlock(), createElementBlock("div", ru, [
          renderSlot(d.$slots, "prepend")
        ])) : createCommentVNode("", true),
        createBaseVNode("div", au, [
          d.$slots.prefix ? (openBlock(), createElementBlock("span", iu, [
            renderSlot(d.$slots, "prefix")
          ])) : createCommentVNode("", true),
          withDirectives(createBaseVNode("input", mergeProps({
            class: "hc-input__inner",
            type: d.showPassword ? l.value ? "text" : "password" : d.type,
            ref_key: "inputRef",
            ref: f
          }, unref(o), {
            disabled: d.disabled,
            readonly: d.readonly,
            autocomplete: d.autocomplete,
            placeholder: d.placeholder,
            autofocus: d.autofocus,
            form: d.form,
            "onUpdate:modelValue": m[0] || (m[0] = (A) => i.value = A),
            onInput: u,
            onChange: g,
            onFocus: v,
            onBlur: _
          }), null, 16, ou), [
            [vModelDynamic, i.value]
          ]),
          d.$slots.suffix || w.value || b.value ? (openBlock(), createElementBlock("span", {
            key: 1,
            class: "hc-input__suffix",
            onClick: c
          }, [
            renderSlot(d.$slots, "suffix"),
            w.value ? (openBlock(), createBlock(L, {
              key: 0,
              icon: "circle-xmark",
              class: "hc-input__clear",
              onClick: O,
              onMousedown: withModifiers(h2, ["prevent"])
            })) : createCommentVNode("", true),
            b.value && l.value ? (openBlock(), createBlock(L, {
              key: 1,
              icon: "eye",
              class: "hc-input__password",
              onClick: x
            })) : createCommentVNode("", true),
            b.value && !l.value ? (openBlock(), createBlock(L, {
              key: 2,
              icon: "eye-slash",
              class: "hc-input__password",
              onClick: x
            })) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ]),
        d.$slots.append ? (openBlock(), createElementBlock("div", su, [
          renderSlot(d.$slots, "append")
        ])) : createCommentVNode("", true)
      ], 64)) : withDirectives((openBlock(), createElementBlock("textarea", mergeProps({
        key: 1,
        class: "hc-textarea__wrapper"
      }, unref(o), {
        ref_key: "inputRef",
        ref: f,
        disabled: d.disabled,
        readonly: d.readonly,
        autocomplete: d.autocomplete,
        placeholder: d.placeholder,
        autofocus: d.autofocus,
        form: d.form,
        "onUpdate:modelValue": m[1] || (m[1] = (A) => i.value = A),
        onInput: u,
        onChange: g,
        onFocus: v,
        onBlur: _
      }), null, 16, lu)), [
        [vModelText, i.value]
      ])
    ], 2));
  }
});
var fu = {
  key: 0,
  class: "hc-select__loading"
};
var cu = {
  key: 1,
  class: "hc-select__nodata"
};
var du = {
  key: 2,
  class: "hc-select__menu"
};
var pu = ["id", "onClick"];
var hu = defineComponent({
  name: "HcSelect",
  __name: "Select",
  props: {
    modelValue: {},
    options: { default: () => [] },
    placeholder: {},
    disabled: { type: Boolean },
    clearable: { type: Boolean },
    renderLabel: {},
    filterable: { type: Boolean },
    filterMethod: {},
    remote: { type: Boolean },
    remoteMethod: {}
  },
  emits: ["change", "update:modelValue", "visible-change", "clear"],
  setup(e, { emit: t }) {
    const n = e, r = computed(() => n.remote ? 300 : 0), a = t, o = ref(), i = ref(), s = ref(false), l = {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 9]
          }
        },
        {
          name: "sameWidth",
          enabled: true,
          fn: ({ state: m }) => {
            m.styles.popper.width = `${m.rects.reference.width}px`;
          },
          phase: "beforeWrite",
          requires: ["computeStyles"]
        }
      ]
    }, f = ref(n.options);
    watch(
      () => n.options,
      (m) => {
        f.value = m;
      }
    );
    const p = async (m) => {
      if (n.filterable) {
        if (n.filterMethod && we(we))
          f.value = n.filterMethod(m);
        else if (n.remote && n.remoteMethod && we(n.remoteMethod)) {
          c.loading = true;
          try {
            f.value = await n.remoteMethod(m), console.log(f.value);
          } catch (A) {
            console.error(A), f.value = [];
          } finally {
            c.loading = false;
          }
        } else
          f.value = n.options.filter((A) => A.label.includes(m));
        c.highlightIndex = -1;
      }
    }, y = () => {
      p(c.inputValue);
    }, w = Qe(() => {
      y();
    }, r.value), b = computed(() => n.filterable && c.selectedOption && s.value ? c.selectedOption.label : n.placeholder), h2 = ((m) => {
      const A = n.options.find((E) => E.value == m);
      return A || null;
    })(n.modelValue);
    ref(h2 ? h2.label : "");
    const c = reactive({
      inputValue: h2 ? h2.label : "",
      selectedOption: h2,
      mouseHover: false,
      loading: false,
      highlightIndex: -1
    }), u = (m) => {
      m ? (n.filterable && c.selectedOption && (c.inputValue = ""), n.filterable && p(c.inputValue), o.value.show()) : (o.value.hide(), n.filterable && (c.inputValue = c.selectedOption ? c.selectedOption.label : ""), c.highlightIndex = -1), s.value = m, a("visible-change", m);
    }, g = (m) => {
      switch (m.key) {
        case "Enter":
          m.preventDefault(), s.value ? c.highlightIndex > -1 && f.value[c.highlightIndex] ? d(f.value[c.highlightIndex]) : u(false) : O();
          break;
        case "Escape":
          s.value && u(false);
          break;
        case "ArrowUp":
          m.preventDefault(), f.value.length > 0 && (c.highlightIndex == -1 || c.highlightIndex == 0 ? c.highlightIndex = f.value.length - 1 : c.highlightIndex--);
          break;
        case "ArrowDown":
          f.value.length > 0 && (c.highlightIndex == -1 || c.highlightIndex == f.value.length - 1 ? c.highlightIndex = 0 : c.highlightIndex++);
          break;
      }
    }, v = computed(() => n.clearable && c.mouseHover && c.selectedOption && c.inputValue.trim() != ""), _ = () => {
      c.inputValue = "", c.selectedOption = null, a("clear"), a("change", ""), a("update:modelValue", "");
    }, O = () => {
      n.disabled || (s.value ? u(false) : u(true));
    }, d = (m) => {
      m.disabled || (c.inputValue = m.label, c.selectedOption = m, a("change", m.value), a("update:modelValue", m.value), u(false), i.value.ref.focus());
    };
    return (m, A) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["hc-select", {
        disabled: m.disabled
      }]),
      onClick: O,
      onMouseenter: A[2] || (A[2] = (E) => c.mouseHover = true),
      onMouseleave: A[3] || (A[3] = (E) => c.mouseHover = false)
    }, [
      createVNode($t, {
        onClickOutside: A[1] || (A[1] = (E) => u(false)),
        placement: "bottom-start",
        manual: "",
        ref_key: "tooltipRef",
        ref: o,
        "popper-options": l
      }, {
        content: withCtx(() => [
          c.loading ? (openBlock(), createElementBlock("div", fu, [
            createVNode(L, {
              icon: "spinner",
              spin: ""
            })
          ])) : m.filterable && f.value.length == 0 ? (openBlock(), createElementBlock("div", cu, " No Data ")) : (openBlock(), createElementBlock("ul", du, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (E, ye) => {
              var ge;
              return openBlock(), createElementBlock("li", {
                key: ye,
                class: normalizeClass(["hc-select__menu-item", {
                  disabled: E.disabled,
                  "is-selected": ((ge = c.selectedOption) == null ? void 0 : ge.value) == E.value,
                  highlighted: c.highlightIndex == ye
                }]),
                id: `select-item-${E.value}`,
                onClick: withModifiers((H) => d(E), ["stop"])
              }, [
                createVNode(unref(Ot), {
                  vNode: m.renderLabel ? m.renderLabel(E) : E.label
                }, null, 8, ["vNode"])
              ], 10, pu);
            }), 128))
          ]))
        ]),
        default: withCtx(() => [
          createVNode(uu, {
            modelValue: c.inputValue,
            "onUpdate:modelValue": A[0] || (A[0] = (E) => c.inputValue = E),
            disabled: m.disabled,
            placeholder: b.value,
            readonly: !m.filterable,
            ref_key: "inputRef",
            ref: i,
            onInput: unref(w),
            onKeydown: g
          }, {
            suffix: withCtx(() => [
              v.value ? (openBlock(), createBlock(L, {
                key: 0,
                onClick: withModifiers(_, ["stop"]),
                onMousedown: withModifiers(() => {
                }, ["prevent"]),
                icon: "circle-xmark",
                class: "hc-input__clear"
              })) : (openBlock(), createBlock(L, {
                key: 1,
                icon: "angle-down",
                class: normalizeClass(["header-angle", { active: s.value }])
              }, null, 8, ["class"]))
            ]),
            _: 1
          }, 8, ["modelValue", "disabled", "placeholder", "readonly", "onInput"])
        ]),
        _: 1
      }, 512)
    ], 34));
  }
});
var yu = ["name", "disabled"];
var gu = { class: "hc-switch__core" };
var vu = { class: "hc-switch__core-inner" };
var mu = {
  key: 0,
  class: "hc-switch__core-inner-text"
};
var bu = createBaseVNode("div", { class: "hc-switch__core-action" }, null, -1);
var _u = defineComponent({
  name: "HcSwitch",
  inheritAttrs: false,
  __name: "Switch",
  props: {
    modelValue: { type: [Boolean, String, Number] },
    disabled: { type: Boolean },
    activeText: {},
    inactiveText: {},
    activeValue: { type: [Boolean, String, Number], default: true },
    inactiveValue: { type: [Boolean, String, Number], default: false },
    name: {},
    id: {},
    size: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const n = e, r = t, a = ref(n.modelValue), o = ref(), i = computed(() => a.value == n.activeValue), s = () => {
      if (n.disabled)
        return;
      const l = i.value ? n.inactiveValue : n.activeValue;
      a.value = l, r("update:modelValue", l), r("change", l);
    };
    return onMounted(() => {
      o.value.checked = i.value;
    }), watch(i, (l) => {
      o.value.checked = l;
    }), watch(
      () => n.modelValue,
      (l) => {
        a.value = l;
      }
    ), (l, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["hc-switch", {
        size: l.size,
        disavled: l.disabled,
        checked: i.value
      }]),
      onClick: s
    }, [
      createBaseVNode("input", {
        type: "checkbox",
        class: "hc-switch__input",
        role: "switch",
        name: l.name,
        disabled: l.disabled,
        onKeydown: withKeys(s, ["enter"]),
        ref_key: "input",
        ref: o
      }, null, 40, yu),
      createBaseVNode("div", gu, [
        createBaseVNode("div", vu, [
          l.activeText || l.inactiveText ? (openBlock(), createElementBlock("span", mu, toDisplayString(i.value ? l.activeText : l.inactiveText), 1)) : createCommentVNode("", true)
        ]),
        bu
      ])
    ], 2));
  }
});
library$1.add(icons);
var wu = [
  Qs,
  tl,
  il,
  Ln,
  L,
  bl,
  $t,
  wl,
  nu,
  hu,
  _u
];
var Ou = (e) => {
  wu.forEach((t) => {
    e.component(t.name, t);
  });
};
var Pu = {
  install: Ou
};
export {
  ju as HCmessage,
  Qs as HcButton,
  tl as HcCollapse,
  il as HcCollapseItem,
  bl as HcDropdown,
  wl as HcForm,
  nu as HcFormItem,
  L as HcIcon,
  Ln as HcMessage,
  hu as HcSelect,
  _u as HcSwitch,
  $t as HcTooltip,
  Su as closeMessageAll,
  Pu as default,
  Ou as install
};
//# sourceMappingURL=@stophjc_hc-ui.js.map
