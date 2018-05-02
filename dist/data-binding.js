(function(window){

function mxBind($scope){

    /**
     * Private function that registers the $rootScope
     * @param $rootScope
     * @return $rootScope with all properties
     */
    function bindingFromScope($rootScope, $scope){

        var $innerScope = {};
        var __scope = {};
        var inputsEventListeners = [];

        $scope.call(__scope, __scope);

         /**
         * Gets properties from HTMl
         */
        var __scopeItemsFromHtml = document.body.innerText.match(/{{\w+}}/g);

        (function(){
            var __uniqScopeItemsFromHtml = [];

            if(__scopeItemsFromHtml && __scopeItemsFromHtml.length){
                for(let item of __scopeItemsFromHtml){
                    if(Array.prototype.indexOf.call(__scopeItemsFromHtml, item) > -1){
                        __uniqScopeItemsFromHtml.push(item);
                    }
                }
            }

            __scopeItemsFromHtml = __uniqScopeItemsFromHtml;

        })();

        // var __scopeItemsFromHtml = _.uniq(document.body.innerText.match(/{{\w+}}/g));

        /*
        *  __scopeItemsFromHtmlNotDeclared will be used set value to $rootScope without declaring it in $scope
        */
        var __scopeItemsFromHtmlNotDeclared = [];

        for(let __scopeItemFromHtml of __scopeItemsFromHtml){
            __scopeItemFromHtml = String.prototype.replace.apply(__scopeItemFromHtml, ['{{', '']);
            __scopeItemFromHtml = String.prototype.replace.apply(__scopeItemFromHtml, ['}}', '']);
            
            /**
             * If properites has been already registered by __scopeItem, continue
             */
            if(!Object.prototype.hasOwnProperty.call(__scope, __scopeItemFromHtml)){
                __scope[__scopeItemFromHtml] = '';
                __scopeItemsFromHtmlNotDeclared.push(__scopeItemFromHtml);
            }
        }

        for(let __scopeItem in __scope){
            if(!Object.prototype.hasOwnProperty.call(__scope, __scopeItem)){
                continue;
            }

            bindingInHtml(__scopeItem);

            Object.defineProperty($rootScope, __scopeItem, {
                set: function(newValue){

                    /**
                     * mx-click binding
                     */
                    (function(){
                        var clickModels = document.querySelectorAll(`[mx-click="${__scopeItem}()"]`);

                        for(let clickModel of clickModels){
                            if(typeof __scope[__scopeItem] == 'function'){
                                clickModel.addEventListener('click', (e)=>{
                                    e.preventDefault();
                                    e.stopPropagation();

                                    __scope[__scopeItem].apply($rootScope);
                                })
                            }else{
                                throw Error(`${__scopeItem} is not a function`);
                            }
                        }
                    })();

                    (function(){
                        /**
                         * Sets value from $scope to the $innerScope
                         */
                        if(!$innerScope.hasOwnProperty(__scopeItem)){
                            Object.defineProperty($innerScope, __scopeItem, {
                                value: newValue,
                                writable: true
                            })
                        }else{
                            $innerScope[__scopeItem] = newValue;
                        }

                    })();

                    (function(){
                        /**
                         * Inputs
                         */
                        var inputs = document.querySelector(`[mx-model="${__scopeItem}"]`);

                        if(!inputs){
                            return;
                        }

                        /**
                         * Sets value from $scope to the input
                         */
                        inputs.value = newValue;

                        /**
                         * Adds event listener that will be called when input is used
                         */
                        if(inputsEventListeners.indexOf(__scopeItem) == -1){
                            inputs.addEventListener('keyup', (e)=>{
                                $rootScope[__scopeItem] = e.target.value;
                            })
                            inputs.addEventListener('paste', (e)=>{
                                $rootScope[__scopeItem] = e.target.value;
                            })

                            inputsEventListeners.push(__scopeItem);
                        }
                        
                    })();

                    (function(){
                        /**
                         * Outputs
                         */
                        var outputs = document.querySelector(`[mx-bind="${__scopeItem}"]`);
                        
                        if(!outputs){
                            return;
                        }

                        outputs.innerText = newValue;
                    })();

                    /**
                     * Binding by className mx-binding
                     */
                    (function(){
                        var elements = document.querySelectorAll('.mx-binding');

                        for(let elem of elements){
                            /**
                             * Changes old innerHTML of the binded element to the new one
                             * Could be binded more than one element
                             * elem['mx-binded'] - array of all binded elements in this node
                             * elem['mx-bind-range'] - innerHTML of parentNode
                             */
                            if(elem.hasOwnProperty('mx-binded') && elem.hasOwnProperty('mx-bind-range') && Array.prototype.includes.call(elem['mx-binded'], __scopeItem)){
                                
                                var newElemInnerHtml = elem['mx-bind-range'].innerHTML;

                                /**
                                 * Starts changing content of binded elements
                                 */
                                for(let __scopeItemFromArray of elem['mx-binded']){
                                    var regexp = new RegExp(`{{${__scopeItemFromArray}}}`, 'g');
                                    newElemInnerHtml = String.prototype.replace.apply(newElemInnerHtml, [regexp, $innerScope[__scopeItemFromArray]]);
                                }

                                elem.innerHTML = newElemInnerHtml;
                            }
                        }
                    })();
                },
                get: function(){
                    return $innerScope[__scopeItem] || '';
                }
            })

            /**
             * Applies setter to all properties, that haven't been declared in the $scope
             */
            for(let __scopeItemFromHtml of __scopeItemsFromHtmlNotDeclared){
                /**
                 * If properity hasn't been already declared by __scopeItem, sets $rootScope to make setter work
                 */
                if(document.querySelector(`[mx-model="${__scopeItemFromHtml}"]`)){
                    $rootScope[__scopeItemFromHtml] = document.querySelector(`[mx-model="${__scopeItemFromHtml}"]`).value;
                }else{
                    $rootScope[__scopeItemFromHtml] = '';
                }
            }
        }
        return $rootScope;
    }

    /**
     * Private function that binds all {{__scopeItem}} to the $innerScope by adding class mx-binding and properties (mx-binded="__scopeItem") and (mx-bind-string="content")
     */
    function bindingInHtml(__scopeItem){
        /**
         * Binding HTML.. Start new loop
         */
        // bindingInHtml();

        (function(){
            if(window.find(`{{${__scopeItem}}}`)){
                /**
                 * Finds all bindings inside the range
                 */

                var elem = window.getSelection().getRangeAt(0).commonAncestorContainer.parentElement;

                var __scopeItemArray = [];
                
                if(elem.innerText.match(/{{\w+}}/g)){
                    var match = elem.innerText.match(/{{\w+}}/g);
                    
                    for(let matchItem of match){
                        matchItem = String.prototype.replace.apply(matchItem, ['{{', '']);
                        matchItem = String.prototype.replace.apply(matchItem, ['}}', ''])
                        __scopeItemArray.push(matchItem);
                    }
                }

                if(!elem.hasOwnProperty('mx-binded')){
                    Object.defineProperty(elem, 'mx-binded', {
                        value: __scopeItemArray
                    });
                }

                if(!elem.hasOwnProperty('mx-bind-range')){
                    Object.defineProperty(elem, 'mx-bind-range', {
                        value: elem.cloneNode(true)
                    });
                }

                elem.classList.add('mx-binding');

                /**
                 * Removes selection after binding and adding class mx-binding
                 */
                if (window.getSelection) {
                    if (window.getSelection().empty) {  // Chrome
                      window.getSelection().empty();
                    } else if (window.getSelection().removeAllRanges) {  // Firefox
                      window.getSelection().removeAllRanges();
                    }
                  } else if (document.selection) {  // IE?
                    document.selection.empty();
                  }
            }
        })();
    }

    /**
     * Private function that finds mx-model in HTML template
     * @param $rootScope
     * @return $rootScope
     */
    function bindingFromHtml($rootScope){
        return $rootScope;
    }

    const MX = {};

    MX.__proto__.bind = function($scope){

        if(!$scope){
            throw Error('No $scope defined');
        }

        window.onload = function(){
            var $rootScope = {};

            $rootScope = bindingFromScope($rootScope, $scope);
    
            $rootScope = bindingFromHtml($rootScope);
            
            $scope.call($rootScope, $rootScope);
        }
    }
    /**
     * If $scope defined in main function, start binding
     */
    
    if($scope){
        MX.bind($scope);
    }

    return MX;
}


if (typeof exports !== "undefined") {
    module.exports = mxBind;
}
else {
    window.mx = mxBind

    if (typeof define === "function" && define.amd) {
        define(function() {
            return {
                mx: mxBind
            }
        })
    }
}
})(typeof window === 'undefined' ? this : window);