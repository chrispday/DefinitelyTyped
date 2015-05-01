// Type definitions for polymer 0.8.0 
// Project: https://github.com/polymer
// Definitions by: Chris Day <https://github.com/chrispday>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface PolymerElementProperty {
	/**
	 * Type: constructor (one of Boolean, Date, Number, String, Array or Object)
	 * Attribute type, used for deserializing from an attribute. Unlike 0.5, the property's type is explicit, specified using the type's constructor. See attribute deserialization for more information.
	 */
	type: typeof String | typeof Object | typeof Boolean | typeof Date | typeof Number | typeof Array;
	/**
	 * Type: boolean, number, string or function.
	 * Default value for the property. If `value` is a function, the function is invoked and the return value is used as the default value of the property. If the default value should be an array or object unique to the instance, create the array or object inside a function. See Configuring default property values for more information.
	 */
	value?: any;
	/**
	 * Set to `true` to cause the corresponding attribute to be set on the host node when the property value changes. If the property value is Boolean, the attribute is created as a standard HTML boolean attribute (set if true, not set if false). For other property types, the attribute value is a string representation of the property value. Equivalent to `reflect` in Polymer 0.5. See Reflecting properties to attributes for more information.
	 */
	reflectToAttribute?: boolean;
	/**
	 * If `true`, the property can't be set directly by assignment or data binding. An internal setter is generated, _setProp, where Prop is the property name with the first letter capitalized. See Read-only properties
	 */
	readOnly?: boolean;
	/**
	 * If `true`, the property is available for two-way data binding. In addition, an event, propertyName-changed is fired whenever the property changes. See Property change notification events (notify) for more information.
	 */
	notify?: boolean;
	/**
	 * The value is interpreted as a method name and argument list. The method is invoked to calculate the value whenever any of the argument values changes. Computed properties are always read-only. See Computed properties for more information.
	 */
	computed?: string;
	/**
	 * The value is interpreted as a method name to be invoked when the property value changes. Note that unlike in 0.5, **property change handlers must be registered explicitly.** The propertyName-changed method will not be invoked automatically. See Property change callbacks (observers) for more information.
	 */
	observer?: string;
}

interface PolymerElementProperties {
	[index:string]: PolymerElementProperty;
}

interface PolymerObservers {
	[index:string]: string;
}

interface PolymerHostAttributes {
	[index:string]: any;
}

interface PolymerListeners {
	[index:string]: string;
}

interface PolymerElement {
	/**
	 * The prototype must have an is property that specifies the HTML tag name for your custom element.
	 */
	is: String;
	/**
	 * You can declare properties on your custom element by adding them to the properties object on your prototype. Adding a property to the properties object allows a user to configure the property from markup (see attribute deserialization for details). Any property that’s part of your element’s
	 * public API should be declared in the  properties object.
	 * 
	 * In addition, the properties object can be used to specify:
	 * 
	 * Property type.
	 * Default value.
	 * Property change observer. Calls a method whenever the property value changes.
	 * Read-only status. Prevents accidental changes to the property value.
	 * Two-way data binding support. Fires an event whenever the property value changes.
	 * Computed property. Dynamically calculates a value based on other properties.
	 * Property reflection to attribute. Updates the corresponding attribute value when the property value changes.
	 */
	properties?: PolymerElementProperties;
	/**
	 * To observe changes to a set of properties, use the observers object. Specifying a space-separated list of dependent properties that should result in a change function being called. These observers differ from single-property observers in that the change handler is called asynchronously.
	 */
	observers?: PolymerObservers;
	created?(): void;
	attached?(): void;
	detached?(): void;
	/**
	 * The ready method is part of an element’s lifecycle and is automatically called ‘bottom-up’ after the element’s template has been stamped and all elements inside the element’s local DOM have been configured (with values bound from parents, deserialized attributes, or else default values) and had their ready method called. Implement ready when it’s necessary to manipulate an element’s local DOM when the element is constructed.
	 */
	ready?(): void;
	attributeChanged?(name:string, type:any) : void;
	/**
	 * The Polymer method returns a basic constructor that can be used to instantiate the custom element. If you want to pass arguments to the constructor to configure the new element, you can specify a custom constructor function on the prototype. This function is not a true constructor, but a configuration function. The constructor returned from Polymer creates an instance using  document.createElement, then invokes the user-supplied constructor function with this bound to the element instance. Any arguments passed to the actual constructor are passed on to constructor function.
	 */
	//constructor?(...args: any[]): void;
	/**
	 * Polymer 0.8 currently only supports extending native HTML elements (for example, input, or button, as opposed to extending other custom elements). To extend a native HTML element, set the extends property to the tag name of the element to extend.
	 */
	extends?: string;
	/**
	 * If a custom elements needs HTML attributes set on it at create-time, these may be declared in a hostAttributes property on the prototype, where keys are the attribute name and values are the values to be assigned. Values should typically be provided as strings, as HTML attributes can only be strings; however, the standard serialize method is used to convert values to strings, so true will serialize to an empty attribute, and false will result in no attribtue set, and so forth (see here for more details).
	 */
	hostAttributes?: PolymerHostAttributes;
	/**
	 * Polymer will “mixin” objects specified in a mixin array into the prototype. This can be useful for adding common code between multiple elements. The current mixin feature in 0.8 is basic; it simply loops over properties in the provided object and adds property descriptors for those on the prototype (such that set/get accessors are copied in addition to properties and functions).
	 */
	mixins?: any[];
	listeners?: PolymerListeners;
}

interface Polymer {
    (prototype: PolymerElement): void;
}

declare var Polymer: Polymer;
