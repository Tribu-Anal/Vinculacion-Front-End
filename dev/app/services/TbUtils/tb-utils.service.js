TbUtils.$inject = ['toaster', '$rootScope', '$mdDialog', '$state'];

function TbUtils(toaster, $rootScope, $mdDialog, $state) {
    var service = {
        fillListWithResponseData: fillListWithResponseData,
        displayNotification: displayNotification,
        preventGeneralLoading: preventGeneralLoading,
        initArrayToValue: initArrayToValue,
        removeItemFromList: removeItemFromList,
        showErrorMessage: showErrorMessage,
        setModalParams: setModalParams,
        getModalParams: getModalParams,
        toTitleCase: toTitleCase,
        getAndLoad: getAndLoad,
        showCustomModal: showCustomModal,
        getExistingAndLoad: getExistingAndLoad,
        getNewFromArrays: getNewFromArrays,
        getRemovedFromArrays: getRemovedFromArrays,
        deleteAndNotify: deleteAndNotify,
        updateAndNotify: updateAndNotify,
        updateAndGoTo: updateAndGoTo,
        postAndGoTo: postAndGoTo,
        assignAndGoTo: assignAndGoTo,
        getListCopy: getListCopy,
        queryList: queryList,
        confirm: confirm,
        prompt: prompt,
        reload: reload,
        customDialog: customDialog,
        sortBy: sortBy,
        go: go
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
            timeout: 4000
        });
    }

    function preventGeneralLoading() {
        $rootScope.generalLoading = false;
    }

    function initArrayToValue(array, value, size) {
        for (let i = 0; i < size; i++)
            array.push(value);
    }

    function queryList (list, key, where) {
        if (!list || !key) return [];

        let newList = [];

        for (item of list) {
            if (typeof item === 'object' && item[key] === where)
                newList.push(item);
        }

        return newList;
    }

    function removeItemFromList(listItem, list) {
        let indexOfItem = list.indexOf(listItem);
        list.splice(indexOfItem, 1);
    }

    function showErrorMessage (response) {
        if (response.status === 400) {
            const err = response.data.ModelState;
            for (const key in err)
                displayNotification('error', 'Error', err[key][0]);
        }
        else
            displayNotification('error', 'Error', response.data);
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

    function reload () {
        if ($state.includes('main'))
            preventGeneralLoading();
        
        $state.reload();
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

    function getListCopy (list) {
        let cpy = [];

        for (e of list)
            cpy.push(e);

        return cpy;
    }

    function sortBy(array, property) {
        array.sort(function(a, b) {
            if (a[property] > b[property]) {
                return 1;
            }
            if (a[property] < b[property]) {
                return -1;
            }
            return 0;
        });
        return array;
    }

    function go (state, params) {
        if (state.includes('main'))
            preventGeneralLoading();
        
        $state.go(state, params);
    }

    function getNewFromArrays (old, _new) {
        let newItems = [];

        for (item of _new) {
            if (old.indexOf(item) >= 0) continue;
            newItems.push(item);
        }

        return newItems;
    }

    function getRemovedFromArrays (old, _new) {
        return getNewFromArrays(_new, old);
    }

    function getAndLoad (get, list, fin, page, size) {
        if (typeof page === 'number' && typeof size === 'number')
            get(page, size, resp => { fillListWithResponseData(resp.data, list); },
                            showErrorMessage, fin);
        else
            get(resp => { fillListWithResponseData(resp.data, list); },
                showErrorMessage, fin);
    }

    function getExistingAndLoad (get, id, list, fin) {
        get(id, resp => { fillListWithResponseData(resp.data, list); },
                showErrorMessage, fin);
    }

    function deleteAndNotify (_delete, data, list, msg, fin) {
        _delete(data.Id, resp => {
                removeItemFromList(data, list); displayNotification('success', 'Exito', msg); 
            }, showErrorMessage, fin);
    }

    function updateAndNotify (put, id, data, msg, fin) {
        put(id, data, resp => {  displayNotification('success', 'Exito', msg); }, 
                      showErrorMessage, fin);
    }

    function updateAndGoTo (put, id, data, toState, msg, fin) {
        put(id, data, resp => { 
            displayNotification('success', 'Exito', msg ? msg : 'Actualizado!');
            go(toState);
        }, showErrorMessage, fin);
    }

    function postAndGoTo (post, data, toState, msg, fin) {
        post(data, resp => {
            if (msg) displayNotification('success', 'Exito', msg);
            if(toState) go(toState);
        }, showErrorMessage, fin);
    }

    function assignAndGoTo (post, id, data, toState, msg, fin) {
        post(id, data, resp => {
            displayNotification('success', 'Exito', msg ? msg : 'Se creo con exito!');
            go(toState);
        }, showErrorMessage, fin);
    }

    function showCustomModal (ctrl, templateUrl, _then, locals) {
        $mdDialog.show({
          controller: ctrl,
          templateUrl: templateUrl,
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          locals: locals
        })
        .then(_then);
    }

}

module.exports = {
    name: 'TbUtils',
    srvc: TbUtils
};