"use strict";

TbUtils.$inject = ['toaster', '$rootScope'];

function TbUtils(toaster, $rootScope) {
    var service = {
        fillListWithResponseData: fillListWithResponseData,
        displayNotification: displayNotification,
        preventGeneralLoading: preventGeneralLoading,
        initArrayToValue: initArrayToValue,
        removeItemFromList: removeItemFromList,
        showErrorMessage: showErrorMessage,
        getTable: getTable,
        setModalParams: setModalParams,
        getModalParams: getModalParams
    };
    var vm = this;
    vm.ModalParams;

    return service;

    function fillListWithResponseData(responseData, list) {

        for (let obj in responseData)
            list.push(responseData[obj]);

    }

    function displayNotification(type, title, body) {
        toaster.pop({
            type: type,
            title: title,
            body: body,
            timeout: 1500
        });
    }

    function preventGeneralLoading() {
        $rootScope.generalLoading = false;
    }

    function initArrayToValue(array, value, size) {
        for (let i = 0; i < size; i++)
            array.push(value);
    }

    function removeItemFromList(listItem, list) {
        let indexOfItem = list.indexOf(list);
        list.splice(indexOfItem, 1);
    }

    function showErrorMessage(type, response, customMessage, customTitle) {
        if (validateApiErrorMessageExists(response))
            displayNotification(type, response.statusText, response.data);

        else
            displayNotification(type, customTitle, customMessage);
    }

    function validateApiErrorMessageExists(response) {
        if (response.data === undefined || response.data === "")
            return false;

        return true;
    }

    function getTable(headers) {
        let table = {
            headers: headers,
            body: [],
            actions: true
        }

        return table;
    }

    function setModalParams(params) {
        vm.ModalParams = params;
    }

    function getModalParams() {
        return vm.ModalParams;
    }

}

module.exports = TbUtils;