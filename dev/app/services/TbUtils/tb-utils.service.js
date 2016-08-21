TbUtils.$inject = ['toaster', '$rootScope', '$mdDialog'];

function TbUtils(toaster, $rootScope, $mdDialog) {
    var service = {
        fillListWithResponseData: fillListWithResponseData,
        displayNotification: displayNotification,
        preventGeneralLoading: preventGeneralLoading,
        initArrayToValue: initArrayToValue,
        removeItemFromList: removeItemFromList,
        showErrorMessage: showErrorMessage,
        getTable: getTable,
        setModalParams: setModalParams,
        getModalParams: getModalParams,
        toTitleCase: toTitleCase,
        confirm: confirm,
        prompt: prompt,
        customDialog: customDialog
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
        if (!response || !response.data)
            return false;

        return true;
    }

    function getTable(headers) {
        let table = {
            headers: headers,
            body: [],
            actions: false
        }

        return table;
    }

    function setModalParams(params) {
        vm.ModalParams = params;
    }

    function getModalParams() {
        return vm.ModalParams;
    }

    function toTitleCase(str) {
        if (!str)
            return;
        str = String(str);
        return str.replace(/\w\S*/g, toCapitalize);
    }

    function toCapitalize(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }

    function confirm(title, msg, callback) {
        const confirm = $mdDialog.confirm()
            .title(title)
            .textContent(msg)
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(callback);
    }

    function prompt(title, msg, placeholder, callback) {
        const prompt =
            $mdDialog.prompt()
            .title(title)
            .textContent(msg)
            .placeholder(placeholder)
            .ok('Aceptar')
            .cancel('Cancelar');

        $mdDialog.show(prompt).then(callback);
    }

    function customDialog(dialogController, dialogTemplateUrl, callback) {
        let options = {
            controller: dialogController,
            templateUrl: dialogTemplateUrl,
            clickOutsideToClose: true,
            parent: angular.element(document.body)
        }
        $mdDialog.show(options).then(callback);
    }

}

module.exports = {
    name: 'TbUtils',
    srvc: TbUtils
};