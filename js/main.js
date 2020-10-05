$(document).ready(function () {
  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    slidesPerView: 3,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })

  var modalButton = $('[data-toggle="modal"]');
  var closeModalButton = $(".close");
  modalButton.on("click", openModal);
  closeModalButton.on("click", closeModal);

  function openModal() {
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.addClass("modal__overlay--visible");
    modalDialog.addClass("modal__dialog--visible");
  }

  function closeModal(event) {
    event.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
  }
});




"use strict";
var multiItemSlider = (function () {
  return function (selector, config) {
    var _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".slider-wrapper"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".slider-item"), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll(".slider-control"), // элементы управления
      _sliderControlLeft = _mainElement.querySelector(".slider-control__left"), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector(
        ".slider-control__right"
      ), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = []; // массив элементов
    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({
        item: item,
        position: index,
        transform: 0,
      });
    });

    var position = {
      getMin: 0,
      getMax: _items.length - 1,
    };

    var _transformItem = function (direction) {
      if (direction === "right") {
        if (
          _positionLeftItem + _wrapperWidth / _itemWidth - 1 >=
          position.getMax
        ) {
          return;
        }
        if (!_sliderControlLeft.classList.contains("slider-control__show")) {
          _sliderControlLeft.classList.add("slider-control__show");
        }
        if (
          _sliderControlRight.classList.contains("slider-control__show") &&
          _positionLeftItem + _wrapperWidth / _itemWidth >= position.getMax
        ) {
          _sliderControlRight.classList.remove("slider-control__show");
        }
        _positionLeftItem++;
        _transform -= _step;
      }
      if (direction === "left") {
        if (_positionLeftItem <= position.getMin) {
          return;
        }
        if (!_sliderControlRight.classList.contains("slider-control__show")) {
          _sliderControlRight.classList.add("slider-control__show");
        }
        if (
          _sliderControlLeft.classList.contains("slider-control__show") &&
          _positionLeftItem - 1 <= position.getMin
        ) {
          _sliderControlLeft.classList.remove("slider-control__show");
        }
        _positionLeftItem--;
        _transform += _step;
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains("slider-control")) {
        e.preventDefault();
        var direction = e.target.classList.contains("slider-control__right") ?
          "right" :
          "left";
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener("click", _controlClick);
      });
    };

    // инициализация
    _setUpListeners();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
    };
  };
})();

var slider = multiItemSlider(".slider");