import { objectFromEntries } from "./util";

export type BaseType =
  | "any"
  | "array"
  | "boolean"
  | "float"
  | "int"
  | "interface"
  | "string"
  | "union"
  | "time";

export interface PropertyType {
  name: string;
  type: BaseType;
  properties?: Array<PropertyType>;
}

export function guessType(val: any): BaseType {
  if (val === null) return "any";

  switch (typeof val) {
    case "string":
      if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(\+\d\d:\d\d|Z)/.test(val))
        return "time";
      else return "string";
    case "number":
      if (val % 1 === 0) {
        if (val > -2147483648 && val < 2147483647) return "int";
        else return "int";
      } else return "float";
    case "boolean":
      return "boolean";
    case "object":
      if (Array.isArray(val)) return "array";
      return "interface";
    default:
      return "any";
  }
}

export function mergeProperties(
  a: PropertyType,
  b: PropertyType
): PropertyType {
  if (a.type === "any") {
    return a;
  }
  if (b.type === "any") {
    return b;
  }

  if (a.type === b.type) {
    if (a.type === "union") {
    } else if (a.type === "array") {
      let propertiesByName = {};
      let properties: Array<PropertyType> = [];

      [...a.properties, ...b.properties].forEach(bProperty => {
        // Any type already in the mix?
        if (bProperty.type === "any" || propertiesByName["any"]) {
          properties = [];
          propertiesByName["any"] = bProperty;
        }

        let aProperty = propertiesByName[bProperty.name];
        // Collision
        if (aProperty) {
          // Same type?
          if (aProperty.type === bProperty.type) {
            // Complex Types?
            if (aProperty.properties || bProperty.properties) {
            }
          } else if (aProperty.type === bProperty.type) {
          }
        } else {
          propertiesByName[bProperty.name] = bProperty;
          properties.push(bProperty);
        }
      });

      return {
        name: b.name || a.name,
        type: a.type,
        properties
      };
    } else if (a.type === "interface") {
    } else {
      return {
        name: b.name || a.name,
        type: a.type
      };
    }
  }
}

export function objectToProperty(
  object: any,
  interfaceName: string
): PropertyType {
  let type: BaseType = guessType(object);
  let properties: Array<PropertyType>;
  if (type === "array") {
    properties = [];
    const propertiesByType = {};
    object.forEach(item => {
      const bProperty = objectToProperty(item, interfaceName);
      const aProperty = propertiesByType[bProperty.type];

      // Collision
      if (aProperty) {
        propertiesByType[bProperty.type] = mergeProperties(
          aProperty,
          bProperty
        );
      } else {
        propertiesByType[bProperty.type] = bProperty;
        properties.push(bProperty);
      }
    });
  } else if (type === "interface") {
    properties = [];
    Object.entries(object).forEach(([key, value]) => {
      properties.push(objectToProperty(value, key));
    });
  }
  return { name: interfaceName, type, properties };
}
