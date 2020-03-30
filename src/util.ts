export function objectFromEntries(entries) {
  return entries.reduce(function(map, keyValue) {
    if (keyValue) {
      let [key, val] = keyValue;
      map[key] = val;
    }
    return map;
  }, {});
}

export function indent(string, spaces) {
  const indent = " ".repeat(spaces);
  return indent + string.replace(/\n/g, "\n" + indent);
}

function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}

function padEnd(string, targetLength, padString) {
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  padString = String(typeof padString !== "undefined" ? padString : " ");
  if (string.length > targetLength) {
    return String(string);
  } else {
    targetLength = targetLength - string.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return String(string) + padString.slice(0, targetLength);
  }
}

export function justifiedTable(table: Array<Array<string>>): string {
  if (table.length === 0) {
    return "";
  }
  const columnRange = range(0, table[0].length - 1);
  const maxSizes = [];
  columnRange.forEach(c => {
    const maxSize = table.reduce((maxSize, row) => {
      return Math.max(maxSize, row[c].length);
    }, -1);
    maxSizes.push(maxSize);
  });

  return table
    .map(row => {
      const justifiedRow = row.map((column, c) => {
        return padEnd(column, maxSizes[c], " ");
      });
      return justifiedRow.join(" ");
    })
    .join("\n");
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelToSnake(string) {
  return string
    .replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + "_" + m[1];
    })
    .toLowerCase();
}

// Proper cases a string according to Go conventions
function toProperCase(str) {
  // https://github.com/golang/lint/blob/5614ed5bae6fb75893070bdc0996a68765fdd275/lint.go#L771-L810
  const commonInitialisms = [
    "ACL",
    "API",
    "ASCII",
    "CPU",
    "CSS",
    "DNS",
    "EOF",
    "GUID",
    "HTML",
    "HTTP",
    "HTTPS",
    "ID",
    "IP",
    "JSON",
    "LHS",
    "QPS",
    "RAM",
    "RHS",
    "RPC",
    "SLA",
    "SMTP",
    "SQL",
    "SSH",
    "TCP",
    "TLS",
    "TTL",
    "UDP",
    "UI",
    "UID",
    "UUID",
    "URI",
    "URL",
    "UTF8",
    "VM",
    "XML",
    "XMPP",
    "XSRF",
    "XSS"
  ];

  return str
    .replace(/(^|[^a-zA-Z])([a-z]+)/g, function(unused, sep, frag) {
      if (commonInitialisms.indexOf(frag.toUpperCase()) >= 0)
        return sep + frag.toUpperCase();
      else return sep + frag[0].toUpperCase() + frag.substr(1).toLowerCase();
    })
    .replace(/([A-Z])([a-z]+)/g, function(unused, sep, frag) {
      if (commonInitialisms.indexOf(sep + frag.toUpperCase()) >= 0)
        return (sep + frag).toUpperCase();
      else return sep + frag;
    });
}
