(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-toastr', ['exports', '@angular/core', '@angular/animations', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-toastr'] = {}, global.ng.core, global.ng.animations, global.rxjs, global.ng.common));
}(this, function (exports, core, animations, rxjs, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    var ToastContainerDirective = /** @class */ (function () {
        function ToastContainerDirective(el) {
            this.el = el;
        }
        ToastContainerDirective.prototype.getContainerElement = function () {
            return this.el.nativeElement;
        };
        ToastContainerDirective = __decorate([
            core.Directive({
                selector: '[toastContainer]',
                exportAs: 'toastContainer',
            }),
            __metadata("design:paramtypes", [core.ElementRef])
        ], ToastContainerDirective);
        return ToastContainerDirective;
    }());
    var ToastContainerModule = /** @class */ (function () {
        function ToastContainerModule() {
        }
        ToastContainerModule = __decorate([
            core.NgModule({
                declarations: [ToastContainerDirective],
                exports: [ToastContainerDirective],
            })
        ], ToastContainerModule);
        return ToastContainerModule;
    }());

    /**
     * Everything a toast needs to launch
     */
    var ToastPackage = /** @class */ (function () {
        function ToastPackage(toastId, config, message, title, toastType, toastRef) {
            var _this = this;
            this.toastId = toastId;
            this.config = config;
            this.message = message;
            this.title = title;
            this.toastType = toastType;
            this.toastRef = toastRef;
            this._onTap = new rxjs.Subject();
            this._onAction = new rxjs.Subject();
            this.toastRef.afterClosed().subscribe(function () {
                _this._onAction.complete();
                _this._onTap.complete();
            });
        }
        /** Fired on click */
        ToastPackage.prototype.triggerTap = function () {
            this._onTap.next();
            if (this.config.tapToDismiss) {
                this._onTap.complete();
            }
        };
        ToastPackage.prototype.onTap = function () {
            return this._onTap.asObservable();
        };
        /** available for use in custom toast */
        ToastPackage.prototype.triggerAction = function (action) {
            this._onAction.next(action);
        };
        ToastPackage.prototype.onAction = function () {
            return this._onAction.asObservable();
        };
        return ToastPackage;
    }());
    var DefaultNoComponentGlobalConfig = {
        maxOpened: 0,
        autoDismiss: false,
        newestOnTop: true,
        preventDuplicates: false,
        countDuplicates: false,
        resetTimeoutOnDuplicate: false,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning',
        },
        // Individual
        closeButton: false,
        disableTimeOut: false,
        timeOut: 5000,
        extendedTimeOut: 1000,
        enableHtml: false,
        progressBar: false,
        toastClass: 'ngx-toastr',
        positionClass: 'toast-top-right',
        titleClass: 'toast-title',
        messageClass: 'toast-message',
        easing: 'ease-in',
        easeTime: 300,
        tapToDismiss: true,
        onActivateTick: false,
        progressAnimation: 'decreasing',
    };
    var TOAST_CONFIG = new core.InjectionToken('ToastConfig');

    /**
     * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
     */
    var ComponentPortal = /** @class */ (function () {
        function ComponentPortal(component, injector) {
            this.component = component;
            this.injector = injector;
        }
        /** Attach this portal to a host. */
        ComponentPortal.prototype.attach = function (host, newestOnTop) {
            this._attachedHost = host;
            return host.attach(this, newestOnTop);
        };
        /** Detach this portal from its host */
        ComponentPortal.prototype.detach = function () {
            var host = this._attachedHost;
            if (host) {
                this._attachedHost = undefined;
                return host.detach();
            }
        };
        Object.defineProperty(ComponentPortal.prototype, "isAttached", {
            /** Whether this portal is attached to a host. */
            get: function () {
                return this._attachedHost != null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Sets the PortalHost reference without performing `attach()`. This is used directly by
         * the PortalHost when it is performing an `attach()` or `detach()`.
         */
        ComponentPortal.prototype.setAttachedHost = function (host) {
            this._attachedHost = host;
        };
        return ComponentPortal;
    }());
    /**
     * Partial implementation of PortalHost that only deals with attaching a
     * ComponentPortal
     */
    var BasePortalHost = /** @class */ (function () {
        function BasePortalHost() {
        }
        BasePortalHost.prototype.attach = function (portal, newestOnTop) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal, newestOnTop);
        };
        BasePortalHost.prototype.detach = function () {
            if (this._attachedPortal) {
                this._attachedPortal.setAttachedHost();
            }
            this._attachedPortal = undefined;
            if (this._disposeFn) {
                this._disposeFn();
                this._disposeFn = undefined;
            }
        };
        BasePortalHost.prototype.setDisposeFn = function (fn) {
            this._disposeFn = fn;
        };
        return BasePortalHost;
    }());

    /**
     * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
     * application context.
     *
     * This is the only part of the portal core that directly touches the DOM.
     */
    var DomPortalHost = /** @class */ (function (_super) {
        __extends(DomPortalHost, _super);
        function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef) {
            var _this = _super.call(this) || this;
            _this._hostDomElement = _hostDomElement;
            _this._componentFactoryResolver = _componentFactoryResolver;
            _this._appRef = _appRef;
            return _this;
        }
        /**
         * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
         * @param portal Portal to be attached
         */
        DomPortalHost.prototype.attachComponentPortal = function (portal, newestOnTop) {
            var _this = this;
            var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
            var componentRef;
            // If the portal specifies a ViewContainerRef, we will use that as the attachment point
            // for the component (in terms of Angular's component tree, not rendering).
            // When the ViewContainerRef is missing, we use the factory to create the component directly
            // and then manually attach the ChangeDetector for that component to the application (which
            // happens automatically when using a ViewContainer).
            componentRef = componentFactory.create(portal.injector);
            // When creating a component outside of a ViewContainer, we need to manually register
            // its ChangeDetector with the application. This API is unfortunately not yet published
            // in Angular core. The change detector must also be deregistered when the component
            // is destroyed to prevent memory leaks.
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(function () {
                _this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
            // At this point the component has been instantiated, so we move it to the location in the DOM
            // where we want it to be rendered.
            if (newestOnTop) {
                this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
            }
            else {
                this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
            }
            return componentRef;
        };
        /** Gets the root HTMLElement for an instantiated component. */
        DomPortalHost.prototype._getComponentRootNode = function (componentRef) {
            return componentRef.hostView.rootNodes[0];
        };
        return DomPortalHost;
    }(BasePortalHost));

    /** Container inside which all toasts will render. */
    var OverlayContainer = /** @class */ (function () {
        function OverlayContainer(_document) {
            this._document = _document;
        }
        OverlayContainer.prototype.ngOnDestroy = function () {
            if (this._containerElement && this._containerElement.parentNode) {
                this._containerElement.parentNode.removeChild(this._containerElement);
            }
        };
        /**
         * This method returns the overlay container element. It will lazily
         * create the element the first time  it is called to facilitate using
         * the container in non-browser environments.
         * @returns the container element
         */
        OverlayContainer.prototype.getContainerElement = function () {
            if (!this._containerElement) {
                this._createContainer();
            }
            return this._containerElement;
        };
        /**
         * Create the overlay container element, which is simply a div
         * with the 'cdk-overlay-container' class on the document body.
         */
        OverlayContainer.prototype._createContainer = function () {
            var container = this._document.createElement('div');
            container.classList.add('overlay-container');
            this._document.body.appendChild(container);
            this._containerElement = container;
        };
        OverlayContainer.ngInjectableDef = core.defineInjectable({ factory: function OverlayContainer_Factory() { return new OverlayContainer(core.inject(common.DOCUMENT)); }, token: OverlayContainer, providedIn: "root" });
        OverlayContainer = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [Object])
        ], OverlayContainer);
        return OverlayContainer;
    }());

    /**
     * Reference to an overlay that has been created with the Overlay service.
     * Used to manipulate or dispose of said overlay.
     */
    var OverlayRef = /** @class */ (function () {
        function OverlayRef(_portalHost) {
            this._portalHost = _portalHost;
        }
        OverlayRef.prototype.attach = function (portal, newestOnTop) {
            if (newestOnTop === void 0) { newestOnTop = true; }
            return this._portalHost.attach(portal, newestOnTop);
        };
        /**
         * Detaches an overlay from a portal.
         * @returns Resolves when the overlay has been detached.
         */
        OverlayRef.prototype.detach = function () {
            return this._portalHost.detach();
        };
        return OverlayRef;
    }());

    /**
     * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
     * used as a low-level building building block for other components. Dialogs, tooltips, menus,
     * selects, etc. can all be built using overlays. The service should primarily be used by authors
     * of re-usable components rather than developers building end-user applications.
     *
     * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
     */
    var Overlay = /** @class */ (function () {
        function Overlay(_overlayContainer, _componentFactoryResolver, _appRef, _document) {
            this._overlayContainer = _overlayContainer;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._appRef = _appRef;
            this._document = _document;
            // Namespace panes by overlay container
            this._paneElements = new Map();
        }
        /**
         * Creates an overlay.
         * @returns A reference to the created overlay.
         */
        Overlay.prototype.create = function (positionClass, overlayContainer) {
            // get existing pane if possible
            return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
        };
        Overlay.prototype.getPaneElement = function (positionClass, overlayContainer) {
            if (positionClass === void 0) { positionClass = ''; }
            if (!this._paneElements.get(overlayContainer)) {
                this._paneElements.set(overlayContainer, {});
            }
            if (!this._paneElements.get(overlayContainer)[positionClass]) {
                this._paneElements.get(overlayContainer)[positionClass] = this._createPaneElement(positionClass, overlayContainer);
            }
            return this._paneElements.get(overlayContainer)[positionClass];
        };
        /**
         * Creates the DOM element for an overlay and appends it to the overlay container.
         * @returns Newly-created pane element
         */
        Overlay.prototype._createPaneElement = function (positionClass, overlayContainer) {
            var pane = this._document.createElement('div');
            pane.id = 'toast-container';
            pane.classList.add(positionClass);
            pane.classList.add('toast-container');
            if (!overlayContainer) {
                this._overlayContainer.getContainerElement().appendChild(pane);
            }
            else {
                overlayContainer.getContainerElement().appendChild(pane);
            }
            return pane;
        };
        /**
         * Create a DomPortalHost into which the overlay content can be loaded.
         * @param pane The DOM element to turn into a portal host.
         * @returns A portal host for the given DOM element.
         */
        Overlay.prototype._createPortalHost = function (pane) {
            return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
        };
        /**
         * Creates an OverlayRef for an overlay in the given DOM element.
         * @param pane DOM element for the overlay
         */
        Overlay.prototype._createOverlayRef = function (pane) {
            return new OverlayRef(this._createPortalHost(pane));
        };
        Overlay.ngInjectableDef = core.defineInjectable({ factory: function Overlay_Factory() { return new Overlay(core.inject(OverlayContainer), core.inject(core.ComponentFactoryResolver), core.inject(core.ApplicationRef), core.inject(common.DOCUMENT)); }, token: Overlay, providedIn: "root" });
        Overlay = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(3, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [OverlayContainer,
                core.ComponentFactoryResolver,
                core.ApplicationRef, Object])
        ], Overlay);
        return Overlay;
    }());

    /**
     * Reference to a toast opened via the Toastr service.
     */
    var ToastRef = /** @class */ (function () {
        function ToastRef(_overlayRef) {
            this._overlayRef = _overlayRef;
            /** Count of duplicates of this toast */
            this.duplicatesCount = 0;
            /** Subject for notifying the user that the toast has finished closing. */
            this._afterClosed = new rxjs.Subject();
            /** triggered when toast is activated */
            this._activate = new rxjs.Subject();
            /** notifies the toast that it should close before the timeout */
            this._manualClose = new rxjs.Subject();
            /** notifies the toast that it should reset the timeouts */
            this._resetTimeout = new rxjs.Subject();
            /** notifies the toast that it should count a duplicate toast */
            this._countDuplicate = new rxjs.Subject();
        }
        ToastRef.prototype.manualClose = function () {
            this._manualClose.next();
            this._manualClose.complete();
        };
        ToastRef.prototype.manualClosed = function () {
            return this._manualClose.asObservable();
        };
        ToastRef.prototype.timeoutReset = function () {
            return this._resetTimeout.asObservable();
        };
        ToastRef.prototype.countDuplicate = function () {
            return this._countDuplicate.asObservable();
        };
        /**
         * Close the toast.
         */
        ToastRef.prototype.close = function () {
            this._overlayRef.detach();
            this._afterClosed.next();
            this._manualClose.next();
            this._afterClosed.complete();
            this._manualClose.complete();
            this._activate.complete();
            this._resetTimeout.complete();
            this._countDuplicate.complete();
        };
        /** Gets an observable that is notified when the toast is finished closing. */
        ToastRef.prototype.afterClosed = function () {
            return this._afterClosed.asObservable();
        };
        ToastRef.prototype.isInactive = function () {
            return this._activate.isStopped;
        };
        ToastRef.prototype.activate = function () {
            this._activate.next();
            this._activate.complete();
        };
        /** Gets an observable that is notified when the toast has started opening. */
        ToastRef.prototype.afterActivate = function () {
            return this._activate.asObservable();
        };
        /** Reset the toast timouts and count duplicates */
        ToastRef.prototype.onDuplicate = function (resetTimeout, countDuplicate) {
            if (resetTimeout) {
                this._resetTimeout.next();
            }
            if (countDuplicate) {
                this._countDuplicate.next(++this.duplicatesCount);
            }
        };
        return ToastRef;
    }());
    /** Custom injector type specifically for instantiating components with a toast. */
    var ToastInjector = /** @class */ (function () {
        function ToastInjector(_toastPackage, _parentInjector) {
            this._toastPackage = _toastPackage;
            this._parentInjector = _parentInjector;
        }
        ToastInjector.prototype.get = function (token, notFoundValue, flags) {
            if (token === ToastPackage) {
                return this._toastPackage;
            }
            return this._parentInjector.get(token, notFoundValue, flags);
        };
        return ToastInjector;
    }());

    var ToastrService = /** @class */ (function () {
        function ToastrService(token, overlay, _injector, ngZone) {
            this.overlay = overlay;
            this._injector = _injector;
            this.ngZone = ngZone;
            this.currentlyActive = 0;
            this.toasts = [];
            this.index = 0;
            this.toastrConfig = __assign({}, token.default, token.config);
            if (token.config.iconClasses) {
                this.toastrConfig.iconClasses = __assign({}, token.default.iconClasses, token.config.iconClasses);
            }
        }
        /** show toast */
        ToastrService.prototype.show = function (message, title, override, type) {
            if (override === void 0) { override = {}; }
            if (type === void 0) { type = ''; }
            return this._preBuildNotification(type, message, title, this.applyConfig(override));
        };
        /** show successful toast */
        ToastrService.prototype.success = function (message, title, override) {
            if (override === void 0) { override = {}; }
            var type = this.toastrConfig.iconClasses.success || '';
            return this._preBuildNotification(type, message, title, this.applyConfig(override));
        };
        /** show error toast */
        ToastrService.prototype.error = function (message, title, override) {
            if (override === void 0) { override = {}; }
            var type = this.toastrConfig.iconClasses.error || '';
            return this._preBuildNotification(type, message, title, this.applyConfig(override));
        };
        /** show info toast */
        ToastrService.prototype.info = function (message, title, override) {
            if (override === void 0) { override = {}; }
            var type = this.toastrConfig.iconClasses.info || '';
            return this._preBuildNotification(type, message, title, this.applyConfig(override));
        };
        /** show warning toast */
        ToastrService.prototype.warning = function (message, title, override) {
            if (override === void 0) { override = {}; }
            var type = this.toastrConfig.iconClasses.warning || '';
            return this._preBuildNotification(type, message, title, this.applyConfig(override));
        };
        /**
         * Remove all or a single toast by id
         */
        ToastrService.prototype.clear = function (toastId) {
            var e_1, _a;
            try {
                // Call every toastRef manualClose function
                for (var _b = __values(this.toasts), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var toast = _c.value;
                    if (toastId !== undefined) {
                        if (toast.toastId === toastId) {
                            toast.toastRef.manualClose();
                            return;
                        }
                    }
                    else {
                        toast.toastRef.manualClose();
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * Remove and destroy a single toast by id
         */
        ToastrService.prototype.remove = function (toastId) {
            var found = this._findToast(toastId);
            if (!found) {
                return false;
            }
            found.activeToast.toastRef.close();
            this.toasts.splice(found.index, 1);
            this.currentlyActive = this.currentlyActive - 1;
            if (!this.toastrConfig.maxOpened || !this.toasts.length) {
                return false;
            }
            if (this.currentlyActive < this.toastrConfig.maxOpened &&
                this.toasts[this.currentlyActive]) {
                var p = this.toasts[this.currentlyActive].toastRef;
                if (!p.isInactive()) {
                    this.currentlyActive = this.currentlyActive + 1;
                    p.activate();
                }
            }
            return true;
        };
        /**
         * Determines if toast message is already shown
         */
        ToastrService.prototype.findDuplicate = function (message, resetOnDuplicate, countDuplicates) {
            for (var i = 0; i < this.toasts.length; i++) {
                var toast = this.toasts[i];
                if (toast.message === message) {
                    toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);
                    return toast;
                }
            }
            return null;
        };
        /** create a clone of global config and apply individual settings */
        ToastrService.prototype.applyConfig = function (override) {
            if (override === void 0) { override = {}; }
            return __assign({}, this.toastrConfig, override);
        };
        /**
         * Find toast object by id
         */
        ToastrService.prototype._findToast = function (toastId) {
            for (var i = 0; i < this.toasts.length; i++) {
                if (this.toasts[i].toastId === toastId) {
                    return { index: i, activeToast: this.toasts[i] };
                }
            }
            return null;
        };
        /**
         * Determines the need to run inside angular's zone then builds the toast
         */
        ToastrService.prototype._preBuildNotification = function (toastType, message, title, config) {
            var _this = this;
            if (config.onActivateTick) {
                return this.ngZone.run(function () {
                    return _this._buildNotification(toastType, message, title, config);
                });
            }
            return this._buildNotification(toastType, message, title, config);
        };
        /**
         * Creates and attaches toast data to component
         * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
         */
        ToastrService.prototype._buildNotification = function (toastType, message, title, config) {
            var _this = this;
            if (!config.toastComponent) {
                throw new Error('toastComponent required');
            }
            // max opened and auto dismiss = true
            // if timeout = 0 resetting it would result in setting this.hideTime = Date.now(). Hence, we only want to reset timeout if there is
            // a timeout at all
            var duplicate = this.findDuplicate(message, this.toastrConfig.resetTimeoutOnDuplicate && config.timeOut > 0, this.toastrConfig.countDuplicates);
            if (message && this.toastrConfig.preventDuplicates && duplicate !== null) {
                return duplicate;
            }
            this.previousToastMessage = message;
            var keepInactive = false;
            if (this.toastrConfig.maxOpened &&
                this.currentlyActive >= this.toastrConfig.maxOpened) {
                keepInactive = true;
                if (this.toastrConfig.autoDismiss) {
                    this.clear(this.toasts[0].toastId);
                }
            }
            var overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
            this.index = this.index + 1;
            var toastRef = new ToastRef(overlayRef);
            var toastPackage = new ToastPackage(this.index, config, message, title, toastType, toastRef);
            var toastInjector = new ToastInjector(toastPackage, this._injector);
            var component = new ComponentPortal(config.toastComponent, toastInjector);
            var portal = overlayRef.attach(component, this.toastrConfig.newestOnTop);
            toastRef.componentInstance = portal._component;
            var ins = {
                toastId: this.index,
                message: message || '',
                toastRef: toastRef,
                onShown: toastRef.afterActivate(),
                onHidden: toastRef.afterClosed(),
                onTap: toastPackage.onTap(),
                onAction: toastPackage.onAction(),
                portal: portal
            };
            if (!keepInactive) {
                setTimeout(function () {
                    ins.toastRef.activate();
                    _this.currentlyActive = _this.currentlyActive + 1;
                });
            }
            this.toasts.push(ins);
            return ins;
        };
        ToastrService.ngInjectableDef = core.defineInjectable({ factory: function ToastrService_Factory() { return new ToastrService(core.inject(TOAST_CONFIG), core.inject(Overlay), core.inject(core.INJECTOR), core.inject(core.NgZone)); }, token: ToastrService, providedIn: "root" });
        ToastrService = __decorate([
            core.Injectable({ providedIn: 'root' }),
            __param(0, core.Inject(TOAST_CONFIG)),
            __metadata("design:paramtypes", [Object, Overlay,
                core.Injector,
                core.NgZone])
        ], ToastrService);
        return ToastrService;
    }());

    var Toast = /** @class */ (function () {
        function Toast(toastrService, toastPackage, ngZone) {
            var _this = this;
            this.toastrService = toastrService;
            this.toastPackage = toastPackage;
            this.ngZone = ngZone;
            /** width of progress bar */
            this.width = -1;
            /** a combination of toast type and options.toastClass */
            this.toastClasses = '';
            /** controls animation */
            this.state = {
                value: 'inactive',
                params: {
                    easeTime: this.toastPackage.config.easeTime,
                    easing: 'ease-in'
                }
            };
            this.message = toastPackage.message;
            this.title = toastPackage.title;
            this.options = toastPackage.config;
            this.originalTimeout = toastPackage.config.timeOut;
            this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
            this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
                _this.activateToast();
            });
            this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
                _this.remove();
            });
            this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(function () {
                _this.resetTimeout();
            });
            this.sub3 = toastPackage.toastRef.countDuplicate().subscribe(function (count) {
                _this.duplicatesCount = count;
            });
        }
        Object.defineProperty(Toast.prototype, "displayStyle", {
            /** hides component when waiting to be displayed */
            get: function () {
                if (this.state.value === 'inactive') {
                    return 'none';
                }
            },
            enumerable: true,
            configurable: true
        });
        Toast.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
            this.sub2.unsubscribe();
            this.sub3.unsubscribe();
            clearInterval(this.intervalId);
            clearTimeout(this.timeout);
        };
        /**
         * activates toast and sets timeout
         */
        Toast.prototype.activateToast = function () {
            var _this = this;
            this.state = __assign({}, this.state, { value: 'active' });
            if (!this.options.disableTimeOut && this.options.timeOut) {
                this.outsideTimeout(function () { return _this.remove(); }, this.options.timeOut);
                this.hideTime = new Date().getTime() + this.options.timeOut;
                if (this.options.progressBar) {
                    this.outsideInterval(function () { return _this.updateProgress(); }, 10);
                }
            }
        };
        /**
         * updates progress bar width
         */
        Toast.prototype.updateProgress = function () {
            if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
                return;
            }
            var now = new Date().getTime();
            var remaining = this.hideTime - now;
            this.width = (remaining / this.options.timeOut) * 100;
            if (this.options.progressAnimation === 'increasing') {
                this.width = 100 - this.width;
            }
            if (this.width <= 0) {
                this.width = 0;
            }
            if (this.width >= 100) {
                this.width = 100;
            }
        };
        Toast.prototype.resetTimeout = function () {
            var _this = this;
            clearTimeout(this.timeout);
            clearInterval(this.intervalId);
            this.state = __assign({}, this.state, { value: 'active' });
            this.outsideTimeout(function () { return _this.remove(); }, this.originalTimeout);
            this.options.timeOut = this.originalTimeout;
            this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
            this.width = -1;
            if (this.options.progressBar) {
                this.outsideInterval(function () { return _this.updateProgress(); }, 10);
            }
        };
        /**
         * tells toastrService to remove this toast after animation time
         */
        Toast.prototype.remove = function () {
            var _this = this;
            if (this.state.value === 'removed') {
                return;
            }
            clearTimeout(this.timeout);
            this.state = __assign({}, this.state, { value: 'removed' });
            this.outsideTimeout(function () { return _this.toastrService.remove(_this.toastPackage.toastId); }, +this.toastPackage.config.easeTime);
        };
        Toast.prototype.tapToast = function () {
            if (this.state.value === 'removed') {
                return;
            }
            this.toastPackage.triggerTap();
            if (this.options.tapToDismiss) {
                this.remove();
            }
        };
        Toast.prototype.stickAround = function () {
            if (this.state.value === 'removed') {
                return;
            }
            clearTimeout(this.timeout);
            this.options.timeOut = 0;
            this.hideTime = 0;
            // disable progressBar
            clearInterval(this.intervalId);
            this.width = 0;
        };
        Toast.prototype.delayedHideToast = function () {
            var _this = this;
            if (this.options.disableTimeOut ||
                this.options.extendedTimeOut === 0 ||
                this.state.value === 'removed') {
                return;
            }
            this.outsideTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
            this.options.timeOut = this.options.extendedTimeOut;
            this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
            this.width = -1;
            if (this.options.progressBar) {
                this.outsideInterval(function () { return _this.updateProgress(); }, 10);
            }
        };
        Toast.prototype.outsideTimeout = function (func, timeout) {
            var _this = this;
            if (this.ngZone) {
                this.ngZone.runOutsideAngular(function () {
                    return (_this.timeout = setTimeout(function () { return _this.runInsideAngular(func); }, timeout));
                });
            }
            else {
                this.timeout = setTimeout(function () { return func(); }, timeout);
            }
        };
        Toast.prototype.outsideInterval = function (func, timeout) {
            var _this = this;
            if (this.ngZone) {
                this.ngZone.runOutsideAngular(function () {
                    return (_this.intervalId = setInterval(function () { return _this.runInsideAngular(func); }, timeout));
                });
            }
            else {
                this.intervalId = setInterval(function () { return func(); }, timeout);
            }
        };
        Toast.prototype.runInsideAngular = function (func) {
            if (this.ngZone) {
                this.ngZone.run(function () { return func(); });
            }
            else {
                func();
            }
        };
        __decorate([
            core.HostBinding('class'),
            __metadata("design:type", Object)
        ], Toast.prototype, "toastClasses", void 0);
        __decorate([
            core.HostBinding('@flyInOut'),
            __metadata("design:type", Object)
        ], Toast.prototype, "state", void 0);
        __decorate([
            core.HostBinding('style.display'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], Toast.prototype, "displayStyle", null);
        __decorate([
            core.HostListener('click'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Toast.prototype, "tapToast", null);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Toast.prototype, "stickAround", null);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], Toast.prototype, "delayedHideToast", null);
        Toast = __decorate([
            core.Component({
                selector: '[toast-component]',
                template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }} <ng-container *ngIf=\"duplicatesCount\">[{{ duplicatesCount + 1 }}]</ng-container>\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alertdialog\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  ",
                animations: [
                    animations.trigger('flyInOut', [
                        animations.state('inactive', animations.style({ opacity: 0 })),
                        animations.state('active', animations.style({ opacity: 1 })),
                        animations.state('removed', animations.style({ opacity: 0 })),
                        animations.transition('inactive => active', animations.animate('{{ easeTime }}ms {{ easing }}')),
                        animations.transition('active => removed', animations.animate('{{ easeTime }}ms {{ easing }}'))
                    ])
                ],
                preserveWhitespaces: false
            }),
            __metadata("design:paramtypes", [ToastrService,
                ToastPackage,
                core.NgZone])
        ], Toast);
        return Toast;
    }());

    var DefaultGlobalConfig = __assign({}, DefaultNoComponentGlobalConfig, { toastComponent: Toast });
    var ToastrModule = /** @class */ (function () {
        function ToastrModule() {
        }
        ToastrModule_1 = ToastrModule;
        ToastrModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: ToastrModule_1,
                providers: [
                    {
                        provide: TOAST_CONFIG,
                        useValue: {
                            default: DefaultGlobalConfig,
                            config: config,
                        },
                    },
                ],
            };
        };
        var ToastrModule_1;
        ToastrModule = ToastrModule_1 = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [Toast],
                exports: [Toast],
                entryComponents: [Toast],
            })
        ], ToastrModule);
        return ToastrModule;
    }());
    var ToastrComponentlessModule = /** @class */ (function () {
        function ToastrComponentlessModule() {
        }
        ToastrComponentlessModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: ToastrModule,
                providers: [
                    {
                        provide: TOAST_CONFIG,
                        useValue: {
                            default: DefaultNoComponentGlobalConfig,
                            config: config,
                        },
                    },
                ],
            };
        };
        ToastrComponentlessModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
            })
        ], ToastrComponentlessModule);
        return ToastrComponentlessModule;
    }());

    var ToastNoAnimation = /** @class */ (function () {
        function ToastNoAnimation(toastrService, toastPackage, appRef) {
            var _this = this;
            this.toastrService = toastrService;
            this.toastPackage = toastPackage;
            this.appRef = appRef;
            /** width of progress bar */
            this.width = -1;
            /** a combination of toast type and options.toastClass */
            this.toastClasses = '';
            /** controls animation */
            this.state = 'inactive';
            this.message = toastPackage.message;
            this.title = toastPackage.title;
            this.options = toastPackage.config;
            this.originalTimeout = toastPackage.config.timeOut;
            this.toastClasses = toastPackage.toastType + " " + toastPackage.config.toastClass;
            this.sub = toastPackage.toastRef.afterActivate().subscribe(function () {
                _this.activateToast();
            });
            this.sub1 = toastPackage.toastRef.manualClosed().subscribe(function () {
                _this.remove();
            });
            this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(function () {
                _this.resetTimeout();
            });
            this.sub3 = toastPackage.toastRef.countDuplicate().subscribe(function (count) {
                _this.duplicatesCount = count;
            });
        }
        Object.defineProperty(ToastNoAnimation.prototype, "displayStyle", {
            /** hides component when waiting to be displayed */
            get: function () {
                if (this.state === 'inactive') {
                    return 'none';
                }
            },
            enumerable: true,
            configurable: true
        });
        ToastNoAnimation.prototype.ngOnDestroy = function () {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
            this.sub2.unsubscribe();
            this.sub3.unsubscribe();
            clearInterval(this.intervalId);
            clearTimeout(this.timeout);
        };
        /**
         * activates toast and sets timeout
         */
        ToastNoAnimation.prototype.activateToast = function () {
            var _this = this;
            this.state = 'active';
            if (!this.options.disableTimeOut && this.options.timeOut) {
                this.timeout = setTimeout(function () {
                    _this.remove();
                }, this.options.timeOut);
                this.hideTime = new Date().getTime() + this.options.timeOut;
                if (this.options.progressBar) {
                    this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
                }
            }
            if (this.options.onActivateTick) {
                this.appRef.tick();
            }
        };
        /**
         * updates progress bar width
         */
        ToastNoAnimation.prototype.updateProgress = function () {
            if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
                return;
            }
            var now = new Date().getTime();
            var remaining = this.hideTime - now;
            this.width = (remaining / this.options.timeOut) * 100;
            if (this.options.progressAnimation === 'increasing') {
                this.width = 100 - this.width;
            }
            if (this.width <= 0) {
                this.width = 0;
            }
            if (this.width >= 100) {
                this.width = 100;
            }
        };
        ToastNoAnimation.prototype.resetTimeout = function () {
            var _this = this;
            clearTimeout(this.timeout);
            clearInterval(this.intervalId);
            this.state = 'active';
            this.options.timeOut = this.originalTimeout;
            this.timeout = setTimeout(function () { return _this.remove(); }, this.originalTimeout);
            this.hideTime = new Date().getTime() + (this.originalTimeout || 0);
            this.width = -1;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        };
        /**
         * tells toastrService to remove this toast after animation time
         */
        ToastNoAnimation.prototype.remove = function () {
            var _this = this;
            if (this.state === 'removed') {
                return;
            }
            clearTimeout(this.timeout);
            this.state = 'removed';
            this.timeout = setTimeout(function () {
                return _this.toastrService.remove(_this.toastPackage.toastId);
            });
        };
        ToastNoAnimation.prototype.tapToast = function () {
            if (this.state === 'removed') {
                return;
            }
            this.toastPackage.triggerTap();
            if (this.options.tapToDismiss) {
                this.remove();
            }
        };
        ToastNoAnimation.prototype.stickAround = function () {
            if (this.state === 'removed') {
                return;
            }
            clearTimeout(this.timeout);
            this.options.timeOut = 0;
            this.hideTime = 0;
            // disable progressBar
            clearInterval(this.intervalId);
            this.width = 0;
        };
        ToastNoAnimation.prototype.delayedHideToast = function () {
            var _this = this;
            if (this.options.disableTimeOut ||
                this.options.extendedTimeOut === 0 ||
                this.state === 'removed') {
                return;
            }
            this.timeout = setTimeout(function () { return _this.remove(); }, this.options.extendedTimeOut);
            this.options.timeOut = this.options.extendedTimeOut;
            this.hideTime = new Date().getTime() + (this.options.timeOut || 0);
            this.width = -1;
            if (this.options.progressBar) {
                this.intervalId = setInterval(function () { return _this.updateProgress(); }, 10);
            }
        };
        __decorate([
            core.HostBinding('class'),
            __metadata("design:type", Object)
        ], ToastNoAnimation.prototype, "toastClasses", void 0);
        __decorate([
            core.HostBinding('style.display'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], ToastNoAnimation.prototype, "displayStyle", null);
        __decorate([
            core.HostListener('click'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ToastNoAnimation.prototype, "tapToast", null);
        __decorate([
            core.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ToastNoAnimation.prototype, "stickAround", null);
        __decorate([
            core.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], ToastNoAnimation.prototype, "delayedHideToast", null);
        ToastNoAnimation = __decorate([
            core.Component({
                selector: '[toast-component]',
                template: "\n  <button *ngIf=\"options.closeButton\" (click)=\"remove()\" class=\"toast-close-button\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <div *ngIf=\"title\" [class]=\"options.titleClass\" [attr.aria-label]=\"title\">\n    {{ title }} <ng-container *ngIf=\"duplicatesCount\">[{{ duplicatesCount + 1 }}]</ng-container>\n  </div>\n  <div *ngIf=\"message && options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [innerHTML]=\"message\">\n  </div>\n  <div *ngIf=\"message && !options.enableHtml\" role=\"alert\" aria-live=\"polite\"\n    [class]=\"options.messageClass\" [attr.aria-label]=\"message\">\n    {{ message }}\n  </div>\n  <div *ngIf=\"options.progressBar\">\n    <div class=\"toast-progress\" [style.width]=\"width + '%'\"></div>\n  </div>\n  "
            }),
            __metadata("design:paramtypes", [ToastrService,
                ToastPackage,
                core.ApplicationRef])
        ], ToastNoAnimation);
        return ToastNoAnimation;
    }());
    var DefaultNoAnimationsGlobalConfig = __assign({}, DefaultNoComponentGlobalConfig, { toastComponent: ToastNoAnimation });
    var ToastNoAnimationModule = /** @class */ (function () {
        function ToastNoAnimationModule() {
        }
        ToastNoAnimationModule_1 = ToastNoAnimationModule;
        ToastNoAnimationModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: ToastNoAnimationModule_1,
                providers: [
                    {
                        provide: TOAST_CONFIG,
                        useValue: {
                            default: DefaultNoAnimationsGlobalConfig,
                            config: config,
                        },
                    },
                ],
            };
        };
        var ToastNoAnimationModule_1;
        ToastNoAnimationModule = ToastNoAnimationModule_1 = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [ToastNoAnimation],
                exports: [ToastNoAnimation],
                entryComponents: [ToastNoAnimation],
            })
        ], ToastNoAnimationModule);
        return ToastNoAnimationModule;
    }());

    exports.BasePortalHost = BasePortalHost;
    exports.ComponentPortal = ComponentPortal;
    exports.DefaultGlobalConfig = DefaultGlobalConfig;
    exports.DefaultNoAnimationsGlobalConfig = DefaultNoAnimationsGlobalConfig;
    exports.DefaultNoComponentGlobalConfig = DefaultNoComponentGlobalConfig;
    exports.Overlay = Overlay;
    exports.OverlayContainer = OverlayContainer;
    exports.OverlayRef = OverlayRef;
    exports.TOAST_CONFIG = TOAST_CONFIG;
    exports.Toast = Toast;
    exports.ToastContainerDirective = ToastContainerDirective;
    exports.ToastContainerModule = ToastContainerModule;
    exports.ToastInjector = ToastInjector;
    exports.ToastNoAnimation = ToastNoAnimation;
    exports.ToastNoAnimationModule = ToastNoAnimationModule;
    exports.ToastPackage = ToastPackage;
    exports.ToastRef = ToastRef;
    exports.ToastrComponentlessModule = ToastrComponentlessModule;
    exports.ToastrModule = ToastrModule;
    exports.ToastrService = ToastrService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-toastr.umd.js.map