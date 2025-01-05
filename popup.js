document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('redirectToggle');

  // 从存储中读取开关状态
  chrome.storage.sync.get(['redirectEnabled'], function(result) {
    toggleSwitch.checked = result.redirectEnabled !== false; // 默认为true
  });

  // 监听开关变化
  toggleSwitch.addEventListener('change', function() {
    const enabled = toggleSwitch.checked;
    
    // 保存开关状态
    chrome.storage.sync.set({ redirectEnabled: enabled });

    // 更新重定向规则
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: enabled ? ["ruleset_1"] : [],
      disableRulesetIds: enabled ? [] : ["ruleset_1"]
    });
  });
}); 