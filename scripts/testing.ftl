<script>
  let object_keys = [];
  let bugs = [];
  // To get a list of keys in a specific object, you can change to for example: .data_model.realm?keys
  <#list .data_model?keys as key>
  <#attempt>
    // To get a list of keys in a specific object, you can change to for example: !.data_model.realm[key]??
    <#if !.data_model[key]??>
    bugs.push("${key?string}");
        <#continue>
    </#if>
  <#recover>
    bugs.push("${key?string}");
    <#continue>
  </#attempt>
  object_keys.push("${key?string}");
  </#list>;

  // console.log('object_keys:', object_keys);
  // console.log('bugs:', bugs);

  const detected_bugs_keys = [];
  const checked = [];

  <@find_bugs_keys object=.data_model root_key=".data_model" depth=1 />
  <#macro find_bugs_keys object root_key depth>
        <#if (depth > 5) >
            detected_bugs_keys.push({ key: "${root_key?string}", message: "Potential recursion" });
            <#return >
        </#if>

      <#assign isHash = "">
      <#attempt>
        <#assign isHash = object?is_hash || object?is_hash_ex>
      <#recover>
          detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isHash" });
          <#return >
      </#attempt>
      <#if isHash>
          <#assign keys = "">
          <#attempt>
            <#if object?has_content>
                <#assign keys = object?keys>
            <#else>
                detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isHash keys" });
                <#return >
            </#if>
          <#recover>
              detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isHash keys" });
              <#return >
          </#attempt>

          <#list keys as key>
              <#assign this_key=root_key+"."+key>
              <#if ["class","declaredConstructors","superclass","declaringClass" ]?seq_contains(key)>
                <#continue>
              </#if>

              <#if [
                ".data_model.message",
                ".data_model.realm.masterAdminClient",
                ".data_model.realm.delegateForUpdate",
                ".data_model.realm.defaultRole",
                ".data_model.url.loginUpdatePasswordUrl",
                ".data_model.url.loginUpdateProfileUrl"
                ".data_model.url.loginUsernameReminderUrl",
                ".data_model.url.loginUpdateTotpUrl"
              ]?seq_contains(this_key)>
                <#continue>
              </#if>

              <#attempt>
                <#-- <#if !object[key]?has_content || !object[key]??> -->
                <#--    detected_bugs_keys.push({ key: "${this_key?string}", message: "Attempt block isHash key failed" }); -->
                <#--    <#continue> -->
                <#-- </#if> -->
                  <#if !object[key]??>
                      detected_bugs_keys.push({ key: "${this_key?string}", message: "Attempt block isHash key failed" });
                      <#continue>
                  </#if>
              <#recover>

                  detected_bugs_keys.push({ key: "${this_key?string}", message: "Attempt block isHash key failed" });
                  <#continue>
              </#attempt>

              <@find_bugs_keys object=object[key] root_key=this_key depth=depth+1 />
          </#list>
          <#return >
      </#if>

      <#assign isMethod = "">
      <#attempt>
          <#assign isMethod = object?is_method>
      <#recover>
          detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isMethod" });
          <#return >
      </#attempt>
      <#if isMethod>
          <#return >
      </#if>

      <#assign isBoolean = "">
      <#attempt>
        <#assign isBoolean = object?is_boolean>
      <#recover>
          detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isBoolean" });
          <#return >
      </#attempt>
      <#if isBoolean>
          <#attempt>
            <#if !object??>
                detected_bugs_keys.push({ key: "${this_key?string}", message: "Attempt block isBoolean key failed" });
            </#if>
            <#assign test = object?c>
          <#recover>
              detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isBoolean test key" });
              <#return >
          </#attempt>
          <#return >
      </#if>

      <#assign isEnumerable = "">
      <#attempt>
        <#assign isEnumerable = object?is_enumerable>
      <#recover>
          detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isEnumerable" });
          <#return >
      </#attempt>
      <#if isEnumerable>
          <#return >
      </#if>

      <#attempt>
          <#assign test = object?js_string>
          <#if !object??>
             detected_bugs_keys.push({ key: "${this_key?string}", message: "Attempt block isString key failed" });
          </#if>
      <#recover>
          detected_bugs_keys.push({ key: "${root_key?string}", message: "Attempt block isString key failed" });
          <#return >
      </#attempt>

      checked.push("${root_key?string}");
  </#macro>

  console.log('detected_bugs_keys:', detected_bugs_keys);
  // console.log('checked:', checked);

</script>
