"use strict";

angular.module("tabs", []).directive("ngTabs", function() {
  return {
    scope: !0,
    restrict: "EAC",
    controller: function($scope) {
      $scope.tabs = {
        index: 0,
        count: 0,
        init: 1
      }, this.headIndex = 0, this.bodyIndex = 0, this.getIndexTabHead = function() {
        return $scope.tabs.count = ++this.headIndex;
      }, this.getIndexTabBody = function() {
        return ++this.bodyIndex;
      }, this.setIniIndexTab = function(index) {
        $scope.tabs.init = 0 == index || null == index ? $scope.tabs.init : index;
      }, this.getIniIndexTab = function() {
        return $scope.tabs.init;
      }, this.setIndexTabHead = function() {
        $scope.tabs.index = $scope.tabs.init;
      };
    }
  };
}).directive("ngTabHead", function() {
  return {
    scope: !1,
    restrict: "EAC",
    require: "^ngTabs",
    link: function(scope, element, attributes, controller) {
      var index = controller.getIndexTabHead(), value = attributes.ngTabHead, active = /[-*\/%^=!<>&|]/.test(value) ? scope.$eval(value) : !!value;
      scope.tabs.index = scope.tabs.index || (active ? index : null), controller.setIniIndexTab(scope.tabs.index), 
      element.bind("click", function() {
        scope.tabs.index = index, scope.$$phase || scope.$apply();
      }), scope.$watch("tabs.index", function() {
        element.toggleClass("active", scope.tabs.index === index);
      });
    }
  };
}).directive("ngTabBody", function() {
  return {
    scope: !1,
    restrict: "EAC",
    require: "^ngTabs",
    link: function(scope, element, attributes, controller) {
      var index = controller.getIndexTabBody();
      controller.setIndexTabHead(), element.addClass("ng-hide"), scope.$watch("tabs.index", function() {
        element.toggleClass("ng-hide", scope.tabs.index !== index), element.toggleClass(attributes.ngTabBody + " ng-show", scope.tabs.index === index);
      });
    }
  };
});