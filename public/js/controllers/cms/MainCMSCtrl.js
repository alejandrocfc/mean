var app = angular.module('MainCMSCtrl', []);

app.config(iconConfiguration);

app.controller('MainCMSCtrl', function($scope, $log, $http, $mdToast, $mdDialog){
    var tabs = [
            { title: 'Slider', templateUrl: '../views/cms/slider.html'},
            { title: 'Nosotros', content: "You can swipe left and right on a mobile device to change tabs."},
            { title: 'Para quien', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
            { title: 'Para que', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
            { title: 'Solicitar', content: "If you remove a tab, it will try to select a new one."}
        ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.template = "../views/nerd.html";
    $scope.$watch('selectedIndex', function(current, old){
        previous = selected;
        selected = tabs[current];
        if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
        if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    });
    $scope.addTab = function (title, view) {
        view = view || title + " Content View";
        tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
        var index = tabs.indexOf(tab);
        tabs.splice(index, 1);
    };

    $http({
        method: 'GET',
        url: '/api/slider'
    }).then(function (response) {
        console.log('SUCCESS SLIDER: ',response);
        if(response.status === 200){
            $scope.sliders = response.data;
        }
    }, function (response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

    $scope.getInclude = function(tab){
        // console.log(tab);
        if(tab.templateUrl){
            return tab.templateUrl;
        }
        return $scope.template;
    };

    //Muestra un cuadro de dialogo
    $scope.mostrarDialogo = function(operacion, data, event) {
        //Guardando los datos a enviar
        var tempData = undefined;
        if (data === undefined) {
            tempData = {};
        } else {
            tempData = {
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                direction: data.direction

            };
        }
        $mdDialog.show({
            templateUrl: '../views/cms/dialog.html',
            targetEvent: event,
            locals: {
                selectedItem: tempData,
                operacion: operacion
            },
            bindToController: true,
            controller: DialogController,
            parent: angular.element(document.body)
        })
            .then(
                function (result) {
                    mostrarError(result);
                }
            );
    };

    //Controller de cuadro de dialogo
    function DialogController($scope, $mdDialog, operacion, selectedItem) {
        $scope.view = {
            selectedItem: selectedItem,
            operacion: 'Agregar'
        };

        //Determinando el tipo de operacion que es
        switch (operacion) {
            case 'C':
                $scope.view.operacion = 'Agregar';
                break;
            case 'UD':
                $scope.view.operacion = 'Modificar';
                break;
            case 'R':
                $scope.view.operacion = 'Detalles';
                break;
            default:
                $scope.view.operacion = 'Detalles';
                break;
        }

        //Metodos del controller del cuadro de dialogo
        $scope.regresar = regresar;
        $scope.guardar = guardar;
        $scope.borrar = borrar;


        //Regresa a la ventana principal sin realizar accion alguna
        function regresar() {
            $mdDialog.cancel();
        }


        //Selecciona la opcion de agregar un elemento nuevo o modificar uno existente
        function guardar() {
            if ($scope.view.selectedItem.id === undefined) agregar();
            else modificar();
        }

        //Permite agregar un nuevo elemento
        function agregar() {
            //Determinando si existe el elemento con el ID especificado
            var temp = _.find($scope.view.dataTable, function (x) { return x.id === $scope.view.selectedItem.id; });
            if (temp === undefined) {
                //Generando ID para el nuevo elemento
                $scope.view.selectedItem.id = generateUUID();
                $scope.view.dataTable.push($scope.view.selectedItem);
                $mdDialog.hide('Datos agregados con éxito');
            } else {
                $mdDialog.hide('Ya están registrados los datos de la persona indicada');
            }
        }

        //Permite modificar un registro
        function modificar() {
            //Determinando si existe el elemento con el ID especificado
            var index = _.findIndex($scope.view.dataTable, { 'id': $scope.view.selectedItem.id });
            if (index !== -1) {
                $scope.view.dataTable[index].name = $scope.view.selectedItem.name;
                $scope.view.dataTable[index].lastname = $scope.view.selectedItem.lastname;
                $scope.view.dataTable[index].email = $scope.view.selectedItem.email;
                $scope.view.dataTable[index].direction = $scope.view.selectedItem.direction;
                $mdDialog.hide('Datos modificados con éxito');
            } else {
                $mdDialog.hide('No se pudo modificar los datos de la persona seleccionada');
            }
        }

        //Permite eliminar un registro
        function borrar() {
            var item = _.find($scope.view.dataTable, function (x) { return x.id === $scope.view.selectedItem.id; });
            if (item !== undefined) {
                _.pull($scope.view.dataTable, item);
                $mdDialog.hide('Datos borrados con éxito');
            } else {
                $mdDialog.hide('No se pudo borrar los datos de la persona seleccionada');
            }
        }
    }

    //Muestra un mensaje toast (funcion base)
    function simpleToastBase(message, position, delay, action) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position(position)
                .hideDelay(delay)
                .action(action)
        );
    }
    //Muestra un mensaje toast de error
    function mostrarError(mensaje) {
        simpleToastBase(mensaje, 'bottom right', 6000, 'X');
    }

});

//Funcion para configuracion de iconos
function iconConfiguration($mdIconProvider) {
    $mdIconProvider.defaultIconSet('icons_24x24.svg', 24);
}
