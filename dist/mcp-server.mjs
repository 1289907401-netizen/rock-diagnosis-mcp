#!/usr/bin/env node

// src/mcp/prompts.ts
var PROMPTS = [
  {
    name: "diagnose_solution",
    title: "\u8BCA\u65AD\u4E00\u9053\u8BA1\u7B97\u9898",
    description: "\u89E3\u6790\u9898\u76EE\u4E0E\u5B66\u751F\u7B54\u6848\uFF0C\u8C03\u7528\u6C42\u89E3\u5668\u4E0E\u9519\u56E0\u8BCA\u65AD\u5DE5\u5177\uFF0C\u7ED9\u51FA top \u9519\u56E0\u3001\u8BC1\u636E\u4E0E\u4E00\u9053\u8FFD\u95EE\u3002",
    arguments: [
      { name: "problem", description: "\u9898\u76EE\u539F\u6587\uFF08\u542B D\u3001P\u3001\u03B1\u3001\u03C33 \u7B49\u5DF2\u77E5\u91CF\uFF09", required: true },
      { name: "student_answer", description: "\u5B66\u751F\u7684\u5206\u6B65\u7B54\u6848", required: true }
    ]
  },
  {
    name: "generate_variants",
    title: "\u751F\u6210\u9776\u5411\u53D8\u5F0F",
    description: "\u56F4\u7ED5\u6307\u5B9A\u9519\u56E0\u751F\u6210 3 \u9053\u53D8\u5F0F\uFF0C\u6BCF\u9053\u5FC5\u987B\u8C03\u7528\u6C42\u89E3\u5668\u9A8C\u8BC1\u5E76\u7ED9\u51FA\u7B54\u6848\u4E0E\u76EE\u6807\u9519\u56E0\u3002",
    arguments: [
      { name: "misconception", description: "\u8981\u9488\u5BF9\u7684\u9519\u56E0", required: true },
      { name: "difficulty", description: "\u76EE\u6807\u96BE\u5EA6\uFF08\u57FA\u7840/\u4E2D\u7B49/\u63D0\u9AD8\uFF09", required: false }
    ]
  },
  {
    name: "make_study_plan",
    title: "\u751F\u6210\u590D\u4E60\u8BA1\u5212",
    description: "\u6309\u9519\u56E0\u3001\u638C\u63E1\u5EA6\u4E0E\u8003\u8BD5\u65E5\u671F\u6392 7 \u5929\u8BA1\u5212\uFF0C\u9075\u5FAA\u5148\u8865\u6839\u56E0\u3001\u518D\u53D8\u5F0F\u3001\u540E\u7EFC\u5408\u7684\u987A\u5E8F\u3002",
    arguments: [
      { name: "weak_points", description: "\u8584\u5F31\u70B9\u6216\u9519\u56E0\u5217\u8868", required: true },
      { name: "exam_date", description: "\u8003\u8BD5\u65E5\u671F", required: false }
    ]
  },
  {
    name: "verify_answer",
    title: "\u6838\u5BF9\u7B54\u6848",
    description: "\u68C0\u67E5\u5355\u4F4D\u3001\u89D2\u5EA6\u53E3\u5F84\u3001\u516C\u5F0F\u4E0E\u4E2D\u95F4\u6B65\u9AA4\uFF0C\u5FC5\u8981\u65F6\u8C03\u7528\u6C42\u89E3\u5668\u590D\u6838\uFF1B\u8BC1\u636E\u4E0D\u8DB3\u65F6\u660E\u786E\u62D2\u7B54\u3002",
    arguments: [
      { name: "problem", description: "\u9898\u76EE\u4E0E\u5F85\u6838\u5BF9\u7B54\u6848", required: true }
    ]
  }
];
function textFor(name, args) {
  const problem = args.problem ?? "\uFF08\u672A\u63D0\u4F9B\uFF09";
  const student = args.student_answer ?? "\uFF08\u672A\u63D0\u4F9B\uFF09";
  const misconception = args.misconception ?? "\uFF08\u672A\u6307\u5B9A\uFF09";
  const difficulty = args.difficulty ?? "\u4E2D\u7B49";
  const weak = args.weak_points ?? "\uFF08\u672A\u63D0\u4F9B\uFF09";
  const examDate = args.exam_date ?? "\uFF08\u672A\u63D0\u4F9B\uFF09";
  switch (name) {
    case "diagnose_solution":
      return `\u5B66\u751F\u63D0\u4EA4\u4E86\u4E0B\u9762\u8FD9\u9053\u9898\u4E0E\u7B54\u6848\u3002\u8BF7\u6309\u4EE5\u4E0B\u987A\u5E8F\u5904\u7406\uFF1A
1. \u62BD\u53D6\u5DF2\u77E5\u91CF\uFF08D\u3001P\u3001\u03B1\u3001\u03C33\uFF09\u4E0E\u5355\u4F4D\uFF1B
2. \u8C03\u7528 solve_uniaxial_mohr_coulomb \u5F97\u5230\u6807\u51C6\u516D\u6B65\u7ED3\u679C\uFF1B
3. \u8C03\u7528 diagnose_uniaxial_error \u505A\u9519\u56E0\u53CD\u7B97\uFF1B
4. \u53EA\u8BB2 top 1\u20132 \u4E2A\u9519\u56E0\uFF0C\u6BCF\u4E2A\u90FD\u7ED9\u201C\u8BC1\u636E\u53E5 + \u7F6E\u4FE1\u5EA6\u201D\uFF0C\u4E0D\u8981\u6CDB\u6CDB\u8BF4\u201C\u516C\u5F0F\u4E0D\u719F\u201D\uFF1B
5. \u6700\u540E\u95EE\u4E00\u4E2A\u80FD\u9A8C\u8BC1\u6839\u56E0\u7684\u8FFD\u95EE\uFF0C\u7B49\u5B66\u751F\u56DE\u7B54\u540E\u518D\u66F4\u65B0\u5224\u65AD\u3002
\u5982\u679C\u8BC1\u636E\u4E0D\u8DB3\uFF0C\u660E\u786E\u8BF4\u201C\u8BC1\u636E\u4E0D\u8DB3\uFF0C\u9700\u8981\u8865\u5145\u4E2D\u95F4\u6B65\u9AA4\u201D\uFF0C\u4E0D\u8981\u7F16\u3002

\u9898\u76EE\uFF1A
${problem}

\u5B66\u751F\u7B54\u6848\uFF1A
${student}`;
    case "generate_variants":
      return `\u56F4\u7ED5\u9519\u56E0\u300C${misconception}\u300D\u751F\u6210 3 \u9053\u9776\u5411\u53D8\u5F0F\uFF0C\u96BE\u5EA6\u76EE\u6807\uFF1A${difficulty}\u3002
\u8981\u6C42\uFF1A
1. \u6BCF\u9053\u53EA\u6539\u4E00\u4E2A\u53C2\u6570\uFF08\u03B1\u3001\u03C33\u3001P \u6216 D\uFF09\uFF0C\u4FDD\u6301\u8003\u70B9\u4E0D\u53D8\uFF1B
2. \u6BCF\u9053\u90FD\u5FC5\u987B\u8C03\u7528 solve_uniaxial_mohr_coulomb \u9A8C\u8BC1\uFF0C\u7B54\u6848\u4EE5\u5DE5\u5177\u7ED3\u679C\u4E3A\u51C6\uFF1B
3. \u8F93\u51FA\u8868\u683C\uFF1A\u9898\u9762 / \u5DF2\u77E5\u91CF / \u6807\u51C6\u7B54\u6848 / \u76EE\u6807\u9519\u56E0 / \u4E00\u53E5\u63D0\u793A\uFF1B
4. \u4E0D\u8981\u751F\u6210\u4E0E\u76EE\u6807\u9519\u56E0\u65E0\u5173\u7684\u9898\u3002`;
    case "make_study_plan":
      return `\u6839\u636E\u4E0B\u9762\u7684\u8584\u5F31\u70B9\u4E0E\u8003\u8BD5\u65E5\u671F\uFF0C\u6392\u4E00\u4E2A 7 \u5929\u590D\u4E60\u8BA1\u5212\u3002
\u8584\u5F31\u70B9\uFF1A${weak}
\u8003\u8BD5\u65E5\u671F\uFF1A${examDate}
\u8981\u6C42\uFF1A
1. \u5148\u8865\u6839\u56E0\uFF08\u53E3\u5F84\u3001\u5355\u4F4D\u3001\u516C\u5F0F\uFF09\uFF0C\u518D\u7EC3\u53D8\u5F0F\uFF0C\u6700\u540E\u505A\u7EFC\u5408\uFF1B
2. \u6BCF\u5929\u7ED9\u51FA 1 \u4E2A\u53EF\u9A8C\u8BC1\u76EE\u6807\uFF08\u4F8B\u5982\u201C6 \u9053\u5355\u8F74\u9898\uFF0Cc \u5168\u5BF9\u201D\uFF09\uFF1B
3. \u7528\u95F4\u9694\u91CD\u590D\u7684\u601D\u60F3\u5B89\u6392\u56DE\u987E\u65E5\uFF1B
4. \u4E0D\u8981\u6392\u6EE1\uFF0C\u7559\u51FA\u7F13\u51B2\u3002`;
    case "verify_answer":
      return `\u8BF7\u6838\u5BF9\u4E0B\u9762\u8FD9\u9053\u9898\u4E0E\u7B54\u6848\uFF1A
1. \u5355\u4F4D\u662F\u5426\u7EDF\u4E00\uFF08kN/mm/MPa\uFF09\uFF1B
2. \u89D2\u5EA6\u53E3\u5F84\u662F\u5426\u4E00\u81F4\uFF08\u03B1 \u662F\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\uFF09\uFF1B
3. \u516C\u5F0F\u662F\u5426\u7528\u5BF9\uFF08c \u5206\u6BCD 2\u3001tan\xB2\u3001\u03C4 \u7684 1/2\uFF09\uFF1B
4. \u9700\u8981\u65F6\u8C03\u7528\u6C42\u89E3\u5668\u590D\u6838\uFF1B
5. \u8BC1\u636E\u4E0D\u8DB3\u65F6\u660E\u786E\u62D2\u7B54\u3002
${problem}`;
    default:
      throw new Error(`\u672A\u77E5 prompt\uFF1A${name}`);
  }
}
function getPrompt(name, args = {}) {
  const prompt = PROMPTS.find((p) => p.name === name);
  if (!prompt) throw new Error(`\u672A\u77E5 prompt\uFF1A${name}`);
  return {
    description: prompt.description,
    messages: [
      { role: "user", content: { type: "text", text: textFor(name, args) } }
    ]
  };
}

// src/knowledge/content.ts
var CONCEPTS_MD = `# \u5CA9\u77F3\u529B\u5B66\u6838\u5FC3\u8003\u70B9

> \u81EA\u5199\u6458\u8981\uFF0C\u7528\u4E8E\u667A\u80FD\u4F53\u4F5C\u7B54\u65F6\u7684\u77E5\u8BC6\u5E95\u5EA7\uFF1B\u4E0D\u66FF\u4EE3\u6559\u6750\u539F\u6587\u3002

## 1. \u5CA9\u77F3\u4E0E\u5CA9\u4F53
\u5CA9\u77F3\u662F\u5929\u7136\u77FF\u7269\u7684\u96C6\u5408\u4F53\uFF1B\u5CA9\u4F53\u662F\u5CA9\u77F3\u4E0E\u7ED3\u6784\u9762\uFF08\u5F31\u9762\uFF09\u7EC4\u6210\u7684\u5730\u8D28\u4F53\u3002\u5CA9\u4F53\u5F3A\u5EA6\u7531\u5CA9\u5757\u5F3A\u5EA6\u4E0E\u7ED3\u6784\u9762\u6027\u8D28\u5171\u540C\u63A7\u5236\u3002

## 2. \u5BB9\u91CD
\u5355\u4F4D\u4F53\u79EF\u5CA9\u77F3\u7684\u91CD\u91CF\uFF0C\u03B3 = W/V\uFF0C\u5355\u4F4D kN/m\xB3\u3002\u6CE8\u610F\u533A\u5206\u5929\u7136\u3001\u5E72\u3001\u9971\u548C\u72B6\u6001\uFF1B\u8D28\u91CF\u4E0E\u91CD\u91CF\u4E0D\u80FD\u6DF7\u7528\u3002

## 3. \u5B54\u9699\u6027\u4E0E\u5438\u6C34\u6027
\u5B54\u9699\u6027\u6307\u5CA9\u77F3\u4E2D\u5B54\u9699\u3001\u5B54\u6D1E\u3001\u88C2\u9699\u7684\u53D1\u80B2\u7A0B\u5EA6\uFF1B\u5438\u6C34\u6027\u6307\u5CA9\u77F3\u5438\u6C34\u7684\u80FD\u529B\u3002\u4E24\u8005\u76F8\u5173\u4F46\u4E0D\u7B49\u540C\u3002

## 4. \u6297\u51BB\u6027
\u5CA9\u77F3\u62B5\u6297\u51BB\u878D\u5FAA\u73AF\u7834\u574F\u7684\u80FD\u529B\u3002\u5438\u6C34\u7387\u8D8A\u9AD8\u3001\u5B54\u9699\u8D8A\u591A\uFF0C\u6297\u51BB\u6027\u901A\u5E38\u8D8A\u5DEE\u3002

## 5. \u5355\u8F74\u6297\u538B\u5F3A\u5EA6
\u65E0\u4FA7\u9650\u6761\u4EF6\u4E0B\uFF0C\u5CA9\u77F3\u7834\u574F\u524D\u80FD\u627F\u53D7\u7684\u6700\u5927\u538B\u5E94\u529B\uFF1A\u03C3c = P/A\u3002\u8BD5\u4EF6\u5C3A\u5BF8\u3001\u5F62\u72B6\u3001\u9AD8\u5F84\u6BD4\u3001\u52A0\u8F7D\u901F\u7387\u3001\u542B\u6C34\u72B6\u6001\u90FD\u4F1A\u5F71\u54CD\u6D4B\u503C\u3002

## 6. \u6297\u62C9\u5F3A\u5EA6
\u5CA9\u77F3\u62B5\u6297\u62C9\u4F38\u7834\u574F\u7684\u80FD\u529B\uFF0C\u8FDC\u4F4E\u4E8E\u6297\u538B\u5F3A\u5EA6\u3002\u5E38\u7528\u5288\u88C2\u6CD5\u95F4\u63A5\u6D4B\u5B9A\u3002

## 7. \u6297\u526A\u5F3A\u5EA6
\u5CA9\u77F3\u62B5\u6297\u526A\u5207\u7834\u574F\u7684\u80FD\u529B\uFF0C\u5E93\u4ED1\u51C6\u5219\uFF1A\u03C4 = c + \u03C3\xB7tan\u03C6\u3002c \u4E3A\u9ECF\u805A\u529B\uFF0C\u03C6 \u4E3A\u5185\u6469\u64E6\u89D2\u3002

## 8. \u4E09\u8F74\u6297\u538B\u5F3A\u5EA6
\u6709\u56F4\u538B\u6761\u4EF6\u4E0B\u7684\u5CF0\u503C\u4E3B\u5E94\u529B\u3002\u56F4\u538B\u589E\u5927\uFF0C\u5CF0\u503C\u5F3A\u5EA6\u4E0E\u6B8B\u4F59\u5F3A\u5EA6\u901A\u5E38\u63D0\u9AD8\uFF0C\u7834\u574F\u7531\u8106\u6027\u5411\u5EF6\u6027\u8F6C\u53D8\u3002

## 9. \u56F4\u538B\u6548\u5E94
\u03C33 \u589E\u5927\u65F6\uFF0C\u5CA9\u77F3\u7684\u5F3A\u5EA6\u548C\u5EF6\u6027\u63D0\u9AD8\uFF1B\u6469\u5C14-\u5E93\u4ED1\u4E0E Hoek-Brown \u90FD\u4F53\u73B0\u8FD9\u4E00\u8D8B\u52BF\u3002

## 10. \u5168\u5E94\u529B-\u5E94\u53D8\u66F2\u7EBF
\u4ECE\u52A0\u8F7D\u5230\u7834\u574F\u7684\u5168\u8FC7\u7A0B\uFF0C\u53EF\u5206\u538B\u5BC6\u3001\u5F39\u6027\u3001\u5C48\u670D\u3001\u5CF0\u503C\u540E\u7834\u574F\u7B49\u9636\u6BB5\u3002\u5CF0\u524D\u9762\u79EF\u4E0E\u5CF0\u540E\u9762\u79EF\u53EF\u7528\u6765\u5224\u65AD\u5CA9\u7206\u503E\u5411\u3002

## 11. \u5F39\u6027\u6A21\u91CF\u4E0E\u6CCA\u677E\u6BD4
\u5F39\u6027\u9636\u6BB5\u8F74\u5411\u5E94\u529B\u4E0E\u8F74\u5411\u5E94\u53D8\u4E4B\u6BD4\u4E3A\u5F39\u6027\u6A21\u91CF E\uFF1B\u6A2A\u5411\u5E94\u53D8\u4E0E\u8F74\u5411\u5E94\u53D8\u4E4B\u6BD4\u4E3A\u6CCA\u677E\u6BD4 \u03BD\u3002

## 12. \u53D8\u5F62\u6A21\u91CF
\u5E94\u529B-\u5E94\u53D8\u66F2\u7EBF\u5272\u7EBF\u6216\u5207\u7EBF\u659C\u7387\uFF0C\u5305\u542B\u5F39\u6027\u4E0E\u90E8\u5206\u5851\u6027\u53D8\u5F62\uFF0C\u901A\u5E38\u4F4E\u4E8E\u5F39\u6027\u6A21\u91CF\u3002

## 13. \u6D41\u53D8
\u6750\u6599\u7684\u5E94\u529B-\u5E94\u53D8\u5173\u7CFB\u4E0E\u65F6\u95F4\u6709\u5173\u7684\u6027\u8D28\uFF0C\u5305\u62EC\u8815\u53D8\u3001\u677E\u5F1B\u3001\u5F39\u6027\u540E\u6548\u7B49\u3002\u8815\u53D8\u53EA\u662F\u6D41\u53D8\u7684\u4E00\u79CD\u3002

## 14. \u8815\u53D8
\u5E94\u529B\u4E0D\u53D8\u65F6\uFF0C\u53D8\u5F62\u968F\u65F6\u95F4\u589E\u957F\u7684\u73B0\u8C61\u3002

## 15. \u7A33\u5B9A\u8815\u53D8\u4E0E\u4E0D\u7A33\u5B9A\u8815\u53D8
\u7A33\u5B9A\u8815\u53D8\uFF1A\u8815\u53D8\u901F\u7387\u968F\u65F6\u95F4\u51CF\u5C0F\uFF0C\u6700\u7EC8\u8D8B\u4E8E\u7A33\u5B9A\u503C\uFF1B\u4E0D\u7A33\u5B9A\u8815\u53D8\uFF1A\u8815\u53D8\u901F\u7387\u6301\u7EED\u589E\u5927\u76F4\u81F3\u7834\u574F\u3002

## 16. \u957F\u671F\u5F3A\u5EA6\u4E0E\u77AC\u65F6\u5F3A\u5EA6
\u957F\u671F\u5F3A\u5EA6\u662F\u8377\u8F7D\u4F5C\u7528\u65F6\u95F4\u8D8B\u4E8E\u65E0\u7A77\u65F6\u7684\u5F3A\u5EA6\uFF1B\u77AC\u65F6\u5F3A\u5EA6\u662F\u77ED\u671F\u52A0\u8F7D\u7684\u6781\u9650\u5F3A\u5EA6\u3002\u957F\u671F\u5F3A\u5EA6\u901A\u5E38\u66F4\u4F4E\u3002

## 17. \u7ED3\u6784\u9762
\u4E0D\u540C\u6210\u56E0\u3001\u4E0D\u540C\u6027\u8D28\u7684\u5730\u8D28\u754C\u9762\uFF0C\u7EDF\u79F0\u7ED3\u6784\u9762\u6216\u5F31\u9762\u3002\u7ED3\u6784\u9762\u7684\u4EA7\u72B6\u3001\u7C97\u7CD9\u5EA6\u3001\u5145\u586B\u7269\u3001\u542B\u6C34\u72B6\u6001\u63A7\u5236\u5CA9\u4F53\u5F3A\u5EA6\u4E0E\u53D8\u5F62\u3002

## 18. RQD
\u5CA9\u77F3\u8D28\u91CF\u6307\u6807\uFF1A\u957F\u5EA6 \u226510 cm \u7684\u5B8C\u6574\u5CA9\u82AF\u6BB5\u4E4B\u548C\u5360\u603B\u8FDB\u5C3A\u7684\u767E\u5206\u6BD4\u3002RQD \u53EA\u53CD\u6620\u5B8C\u6574\u6027\uFF0C\u4E0D\u76F4\u63A5\u7B49\u4E8E\u5F3A\u5EA6\u3002

## 19. RMR
\u5CA9\u4F53\u8BC4\u5206\uFF08Bieniawski\uFF09\uFF1A\u7531\u5355\u8F74\u6297\u538B\u5F3A\u5EA6\u3001RQD\u3001\u8282\u7406\u95F4\u8DDD\u3001\u8282\u7406\u6761\u4EF6\u3001\u5730\u4E0B\u6C34\u4E94\u9879\u8BC4\u5206\uFF0C\u518D\u52A0\u8282\u7406\u65B9\u5411\u4FEE\u6B63\uFF0C\u5F97\u5230 0\u2013100 \u7684\u603B\u5206\u4E0E I\u2013V \u7EA7\u3002

## 20. GSI
\u5730\u8D28\u5F3A\u5EA6\u6307\u6807\uFF0C\u63CF\u8FF0\u5CA9\u4F53\u7ED3\u6784\u9762\u6761\u4EF6\u4E0E\u5CA9\u5757\u6027\u8D28\u3002\u7ECF\u9A8C\u5173\u7CFB GSI \u2248 RMR89 \u2212 5\uFF0C\u4EC5\u9002\u7528\u4E8E RMR89 > 23\u3002

## 21. \u5730\u5E94\u529B\uFF08\u539F\u5CA9\u5E94\u529B\uFF09
\u672A\u53D7\u5DE5\u7A0B\u6270\u52A8\u7684\u5929\u7136\u5E94\u529B\uFF0C\u4E5F\u79F0\u521D\u59CB\u5E94\u529B\u3001\u7EDD\u5BF9\u5E94\u529B\u3002\u7531\u81EA\u91CD\u5E94\u529B\u3001\u6784\u9020\u5E94\u529B\u7B49\u7EC4\u6210\u3002

## 22. \u91D1\u5C3C\u514B\u5047\u8BF4
\u4FA7\u538B\u7CFB\u6570 \u03BB = \u03BD/(1\u2212\u03BD)\uFF0C\u03C3h = \u03BB\u03C3v\u3002\u53EA\u9002\u7528\u4E8E\u81EA\u91CD\u5E94\u529B\u573A\u3001\u6C34\u5E73\u65B9\u5411\u65E0\u6784\u9020\u5E94\u529B\u7684\u7B80\u5316\u60C5\u5F62\u3002

## 23. \u56F4\u5CA9\u4E0E\u5730\u538B
\u56F4\u5CA9\u662F\u53D7\u5F00\u6316\u5F71\u54CD\u3001\u5E94\u529B\u72B6\u6001\u6539\u53D8\u7684\u5468\u56F4\u5CA9\u4F53\uFF1B\u5730\u538B\u662F\u56F4\u5CA9\u5BF9\u652F\u62A4\u6216\u56F4\u5CA9\u4E4B\u95F4\u7684\u4F5C\u7528\u529B\u3002\u4E24\u8005\u4E00\u4E2A\u662F\u5CA9\u4F53\uFF0C\u4E00\u4E2A\u662F\u529B\u3002

## 24. \u6B21\u751F\u5E94\u529B
\u5F00\u6316\u540E\u5E94\u529B\u91CD\u65B0\u5206\u5E03\u5F62\u6210\u7684\u65B0\u7684\u5E73\u8861\u5E94\u529B\uFF0C\u533A\u522B\u4E8E\u539F\u5CA9\u5E94\u529B\u3002

## 25. \u6469\u5C14-\u5E93\u4ED1\u51C6\u5219
\u03C4 = c + \u03C3\xB7tan\u03C6\uFF1B\u4E3B\u5E94\u529B\u5F62\u5F0F\uFF1A\u03C31 = \u03C33\xB7tan\xB2(45\xB0+\u03C6/2) + 2c\xB7tan(45\xB0+\u03C6/2)\u3002\u9002\u7528\u4E8E\u526A\u5207\u7834\u574F\u4E3A\u4E3B\u7684\u5CA9\u77F3\u3002

## 26. Hoek-Brown \u51C6\u5219
\u03C31 = \u03C33 + \u03C3ci\xB7(mb\xB7\u03C33/\u03C3ci + s)^a\uFF0C\u5176\u4E2D mb\u3001s\u3001a \u7531 GSI\u3001mi\u3001D \u8BA1\u7B97\u3002\u9002\u7528\u4E8E\u8282\u7406\u5CA9\u4F53\u3002

## 27. \u683C\u91CC\u83F2\u65AF\u51C6\u5219
\u4ECE\u88C2\u9699\u6269\u5C55\u89D2\u5EA6\u89E3\u91CA\u62C9\u4F38\u7834\u574F\uFF0C\u9002\u7528\u4E8E\u8106\u6027\u5CA9\u77F3\u7684\u6297\u62C9\u7834\u574F\u5206\u6790\u3002

## 28. \u7834\u65AD\u89D2
\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2 \u03B1\uFF0C\u6EE1\u8DB3 \u03B1 = 45\xB0 + \u03C6/2\u3002\u8003\u8BD5\u4E2D\u6700\u5E38\u89C1\u7684\u53E3\u5F84\u9519\u8BEF\u662F\u628A"\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u8F74"\u7684\u5939\u89D2\u5F53\u6210 \u03B1\u3002

## 29. \u8FB9\u5761\u5B89\u5168\u7CFB\u6570
\u6297\u6ED1\u529B\uFF08\u77E9\uFF09\u4E0E\u4E0B\u6ED1\u529B\uFF08\u77E9\uFF09\u4E4B\u6BD4\u3002FS > 1 \u8868\u793A\u7A33\u5B9A\uFF0CFS = 1 \u4E3A\u6781\u9650\u5E73\u8861\u3002

## 30. \u65E0\u9650\u8FB9\u5761
\u6ED1\u9762\u6DF1\u5EA6\u8FDC\u5C0F\u4E8E\u5761\u957F\u65F6\u7684\u7B80\u5316\u6A21\u578B\uFF1AFS = [c\u2032 + (\u03B3z cos\xB2\u03B2 \u2212 u) tan\u03C6\u2032] / (\u03B3z sin\u03B2 cos\u03B2)\u3002

## 31. \u5E73\u9762\u6ED1\u52A8
\u6CBF\u5355\u4E00\u5E73\u9762\u6ED1\u52A8\u7684\u6ED1\u5757\u6A21\u578B\uFF1AFS = [cL + (Wcos\u03B1 \u2212 U)tan\u03C6] / (Wsin\u03B1)\u3002

## 32. \u8F6F\u5CA9
\u5F3A\u5EA6\u4F4E\u3001\u5B54\u9699\u5EA6\u5927\u3001\u80F6\u7ED3\u5DEE\u3001\u53D7\u7ED3\u6784\u9762\u5207\u5272\u6216\u98CE\u5316\u5F71\u54CD\u663E\u8457\uFF0C\u6216\u542B\u81A8\u80C0\u6027\u9ECF\u571F\u77FF\u7269\u7684\u677E\u3001\u6563\u3001\u8F6F\u3001\u5F31\u5CA9\u4F53\u3002

## 33. \u5CA9\u7206
\u9AD8\u5E94\u529B\u786C\u5CA9\u4E2D\uFF0C\u5F00\u6316\u540E\u5F39\u6027\u5E94\u53D8\u80FD\u7A81\u7136\u91CA\u653E\uFF0C\u4F34\u968F\u5F39\u5C04\u3001\u5265\u843D\u3001\u7206\u88C2\u7684\u73B0\u8C61\u3002\u53EF\u7528\u5168\u5E94\u529B-\u5E94\u53D8\u66F2\u7EBF\u7684\u80FD\u91CF\u6BD4\u5224\u65AD\u503E\u5411\u3002

## 34. \u56F4\u5CA9\u63A7\u5236
\u901A\u8FC7\u652F\u62A4\u3001\u52A0\u56FA\u3001\u5378\u538B\u3001\u6539\u5584\u65BD\u5DE5\u65F6\u5E8F\u7B49\u624B\u6BB5\uFF0C\u7EF4\u6301\u56F4\u5CA9\u7A33\u5B9A\u3002\u6838\u5FC3\u662F\u53D1\u6325\u56F4\u5CA9\u81EA\u627F\u80FD\u529B\uFF0C\u800C\u4E0D\u662F\u5355\u7EAF"\u9876\u4F4F"\u3002

## 35. \u76D1\u6D4B\u4E0E\u8D85\u524D\u9884\u62A5
\u76D1\u6D4B\u5185\u5BB9\u901A\u5E38\u5305\u62EC\u4F4D\u79FB\u3001\u5E94\u529B\u3001\u652F\u62A4\u53D7\u529B\u3001\u5730\u4E0B\u6C34\u7B49\uFF1B\u8D85\u524D\u9884\u62A5\u7528\u4E8E\u63A2\u660E\u524D\u65B9\u5730\u8D28\u6761\u4EF6\uFF0C\u5E38\u7528\u5730\u8D28\u8C03\u67E5\u3001\u7269\u63A2\u3001\u94BB\u63A2\u7B49\u65B9\u6CD5\u3002
`;
var MISCONCEPTIONS_MD = `# \u9AD8\u9891\u9519\u56E0\u56FE\u8C31

> \u6BCF\u6761\u5305\u542B\uFF1A\u9519\u8BEF\u8868\u73B0 / \u6B63\u786E\u7406\u89E3 / \u53EF\u68C0\u6D4B\u7EBF\u7D22\u3002\u667A\u80FD\u4F53\u8BCA\u65AD\u65F6\u4F18\u5148\u5339\u914D\u8FD9\u91CC\u3002

## 1. \u7834\u65AD\u89D2\u53E3\u5F84\u9519
\u9519\u8BEF\u8868\u73B0\uFF1A\u628A"\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762"\u7684\u5939\u89D2\uFF0C\u5F53\u6210"\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u8F74/\u8377\u8F7D\u8F74"\u7684\u5939\u89D2\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u03B1 = 45\xB0 + \u03C6/2\uFF0C\u03B1 \u662F\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\uFF1B\u03C6 = 2\u03B1 \u2212 90\xB0\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u03C3n\u3001\u03C4f\u3001\u03C31 \u504F\u79BB\uFF0C\u4F46 \u03C6\u3001c \u53EF\u80FD\u4ECD\u5BF9\u3002

## 2. c \u5206\u6BCD\u6F0F 2
\u9519\u8BEF\u8868\u73B0\uFF1Ac = Rc(1\u2212sin\u03C6)/cos\u03C6\u3002
\u6B63\u786E\u7406\u89E3\uFF1Ac = Rc(1\u2212sin\u03C6)/(2cos\u03C6)\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1Ac \u6B63\u597D\u662F\u6B63\u786E\u503C\u7684 2 \u500D\uFF0C\u03C4f \u4E5F\u968F\u4E4B\u504F\u5927\u3002

## 3. \u52A0\u56F4\u538B\u540E\u4ECD\u7528\u5355\u8F74\u5F3A\u5EA6
\u9519\u8BEF\u8868\u73B0\uFF1A\u03C31 \u4ECD\u53D6 Rc\uFF0C\u6CA1\u6709\u52A0 \u03C33\xB7tan\xB2\u03B1\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u03C31 = \u03C33\xB7tan\xB2\u03B1 + Rc\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u03C31 \u660E\u663E\u504F\u5C0F\uFF0C\u4E14\u7B49\u4E8E Rc\u3002

## 4. \u8377\u8F7D\u5355\u4F4D\u9519
\u9519\u8BEF\u8868\u73B0\uFF1AkN \u5F53 N\uFF0C\u6216\u6F0F\u4E58 1000\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u03C3 = P(kN)\xD71000 / A(mm\xB2)\uFF0C\u7ED3\u679C\u624D\u662F MPa\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1ARc \u5DEE 1000 \u500D\u3002

## 5. \u622A\u9762\u79EF\u7528\u6210 \u03C0D\xB2
\u9519\u8BEF\u8868\u73B0\uFF1AA = \u03C0D\xB2\u3002
\u6B63\u786E\u7406\u89E3\uFF1AA = \u03C0D\xB2/4\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1ARc \u53D8\u6210\u6B63\u786E\u503C\u7684 1/4\u3002

## 6. \u6781\u9650\u4E3B\u5E94\u529B\u516C\u5F0F tan \u6CA1\u5E73\u65B9
\u9519\u8BEF\u8868\u73B0\uFF1A\u03C31 = \u03C33\xB7tan\u03B1 + Rc\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u03C31 = \u03C33\xB7tan\xB2\u03B1 + Rc\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u56F4\u538B\u8D8A\u5927\uFF0C\u504F\u5DEE\u8D8A\u5927\u3002

## 7. \u526A\u5E94\u529B\u6F0F 1/2
\u9519\u8BEF\u8868\u73B0\uFF1A\u03C4 = (\u03C31\u2212\u03C33)\xB7sin2\u03B8\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u03C4 = (\u03C31\u2212\u03C33)/2\xB7sin2\u03B8\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u03C4 \u6B63\u597D\u7FFB\u500D\u3002

## 8. cos2\u03B8 \u7B26\u53F7\u53CD
\u9519\u8BEF\u8868\u73B0\uFF1A\u03C3n = Rc/2 \u2212 Rc/2\xB7cos2\u03B1\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u03C3n = Rc/2 + Rc/2\xB7cos2\u03B1\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u03C3n \u4E0E \u03C4f \u504F\u79BB\uFF0C\u03C4 \u4ECD\u5BF9\u3002

## 9. \u03B3H \u5355\u4F4D\u6CA1\u6362\u7B97
\u9519\u8BEF\u8868\u73B0\uFF1A\u03B3=25 kN/m\xB3\u3001H=1000 m\uFF0C\u76F4\u63A5\u5F97 25000 MPa\u3002
\u6B63\u786E\u7406\u89E3\uFF1A25\xD71000 = 25000 kPa = 25 MPa\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u5E94\u529B\u5927 1000 \u500D\u3002

## 10. \u03BB \u4E0E \u03BD \u6DF7\u7528
\u9519\u8BEF\u8868\u73B0\uFF1A\u628A\u6CCA\u677E\u6BD4\u76F4\u63A5\u5F53\u4FA7\u538B\u7CFB\u6570\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u91D1\u5C3C\u514B\u5F0F \u03BB = \u03BD/(1\u2212\u03BD)\uFF1B\u9898\u7ED9 \u03BB \u5C31\u76F4\u63A5\u7528\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1A\u03C3h \u504F\u5C0F\u6216\u504F\u5927\uFF0C\u4E14\u4E0E \u03BD \u7684\u6570\u503C\u5173\u7CFB\u4E0D\u7B26\u3002

## 11. RQD \u628A\u77ED\u6BB5\u4E5F\u7B97\u8FDB\u53BB
\u9519\u8BEF\u8868\u73B0\uFF1A\u628A\u6240\u6709\u5CA9\u82AF\u6BB5\u90FD\u8BA1\u5165\u5206\u5B50\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u53EA\u8BA1\u957F\u5EA6 \u226510 cm \u7684\u5B8C\u6574\u6BB5\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1ARQD \u504F\u9AD8\u3002

## 12. RMR \u4E0E GSI \u76F4\u63A5\u7B49\u540C
\u9519\u8BEF\u8868\u73B0\uFF1AGSI = RMR\u3002
\u6B63\u786E\u7406\u89E3\uFF1AGSI \u2248 RMR89 \u2212 5\uFF0C\u4E14\u53EA\u9002\u7528\u4E8E RMR > 23\u3002
\u68C0\u6D4B\u7EBF\u7D22\uFF1AGSI \u504F\u9AD8 5 \u5DE6\u53F3\u3002

## 13. \u6D41\u53D8\u7B49\u540C\u8815\u53D8
\u9519\u8BEF\u8868\u73B0\uFF1A\u628A\u6D41\u53D8\u53EA\u7406\u89E3\u4E3A\u8815\u53D8\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u6D41\u53D8\u5305\u62EC\u8815\u53D8\u3001\u677E\u5F1B\u3001\u5F39\u6027\u540E\u6548\u7B49\uFF1B\u8815\u53D8\u53EA\u662F\u5176\u4E2D\u4E00\u79CD\u3002

## 14. \u56F4\u5CA9\u7B49\u540C\u5730\u538B
\u9519\u8BEF\u8868\u73B0\uFF1A\u628A\u56F4\u5CA9\u8BF4\u6210"\u4F5C\u7528\u5728\u652F\u67B6\u4E0A\u7684\u529B"\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u56F4\u5CA9\u662F\u5CA9\u4F53\uFF1B\u5730\u538B\u662F\u529B\u3002

## 15. \u539F\u5CA9\u5E94\u529B\u7B49\u540C\u6B21\u751F\u5E94\u529B
\u9519\u8BEF\u8868\u73B0\uFF1A\u5F00\u6316\u540E\u7684\u5E94\u529B\u4ECD\u79F0\u539F\u5CA9\u5E94\u529B\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u5F00\u6316\u540E\u91CD\u65B0\u5206\u5E03\u7684\u662F\u6B21\u751F\u5E94\u529B\u3002

## 16. \u957F\u671F\u5F3A\u5EA6\u7B49\u540C\u77AC\u65F6\u5F3A\u5EA6
\u9519\u8BEF\u8868\u73B0\uFF1A\u8BA4\u4E3A\u4E24\u8005\u76F8\u540C\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u957F\u671F\u5F3A\u5EA6\u901A\u5E38\u4F4E\u4E8E\u77AC\u65F6\u5F3A\u5EA6\u3002

## 17. \u8F6F\u5CA9\u7B49\u540C\u7ED3\u6784\u9762
\u9519\u8BEF\u8868\u73B0\uFF1A\u628A\u8F6F\u5CA9\u8BF4\u6210"\u5F31\u9762"\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u8F6F\u5CA9\u662F\u5CA9\u4F53\u7C7B\u578B\uFF1B\u7ED3\u6784\u9762\u662F\u5730\u8D28\u754C\u9762\u3002

## 18. Hoek-Brown \u7684 s \u5F53\u5E38\u6570
\u9519\u8BEF\u8868\u73B0\uFF1A\u6240\u6709\u5CA9\u4F53\u90FD\u7528 s=1\u3002
\u6B63\u786E\u7406\u89E3\uFF1As \u968F GSI \u4E0E\u6270\u52A8 D \u53D8\u5316\uFF1B\u5B8C\u6574\u5CA9\u77F3\u624D\u63A5\u8FD1 1\u3002

## 19. \u8FB9\u5761 FS \u7528\u603B\u5E94\u529B\u4EE3\u66FF\u6709\u6548\u5E94\u529B
\u9519\u8BEF\u8868\u73B0\uFF1A\u6709\u6C34\u538B\u65F6\u4ECD\u7528\u603B\u5E94\u529B c\u3001\u03C6\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u6709\u6548\u5E94\u529B\u5206\u6790\u8981\u7528 c\u2032\u3001\u03C6\u2032\uFF0C\u5E76\u6263\u9664\u5B54\u538B u\u3002

## 20. \u5CA9\u7206\u53EA\u770B\u5F3A\u5EA6
\u9519\u8BEF\u8868\u73B0\uFF1A\u5F3A\u5EA6\u9AD8\u5C31\u4E00\u5B9A\u5CA9\u7206\u3002
\u6B63\u786E\u7406\u89E3\uFF1A\u8FD8\u8981\u770B\u80FD\u91CF\u6761\u4EF6\uFF08\u5CF0\u524D\u50A8\u80FD\u4E0E\u5CF0\u540E\u8017\u80FD\u4E4B\u6BD4\uFF09\u548C\u5F00\u6316\u5E94\u529B\u8DEF\u5F84\u3002
`;
var FORMULAS_MD = `# \u516C\u5F0F\u4E0E\u5355\u4F4D\u7EA6\u5B9A

## \u5355\u4F4D
- \u5E94\u529B / \u5F3A\u5EA6\uFF1AMPa
- \u957F\u5EA6 / \u6DF1\u5EA6\uFF1Am\uFF1B\u8BD5\u6837\u76F4\u5F84\uFF1Amm
- \u91CD\u5EA6\uFF1AkN/m\xB3
- \u8FB9\u5761\u9ECF\u805A\u529B / \u5B54\u538B\uFF1AkPa\uFF08= kN/m\xB2\uFF09

## \u5355\u8F74\u538B\u7F29
- A = \u03C0D\xB2/4\uFF08mm\xB2\uFF09
- Rc = P(kN)\xD71000 / A(mm\xB2)\uFF08MPa\uFF09

## \u6469\u5C14-\u5E93\u4ED1
- \u03C4 = c + \u03C3\xB7tan\u03C6
- \u03C31 = \u03C33\xB7tan\xB2(45\xB0+\u03C6/2) + 2c\xB7tan(45\xB0+\u03C6/2)
- \u03B1 = 45\xB0 + \u03C6/2\uFF1B\u03C6 = 2\u03B1 \u2212 90\xB0
- c = Rc(1\u2212sin\u03C6)/(2cos\u03C6)
- \u03C3n = (\u03C31+\u03C33)/2 + (\u03C31\u2212\u03C33)/2\xB7cos2\u03B8
- \u03C4 = (\u03C31\u2212\u03C33)/2\xB7sin2\u03B8
- \u03C31 = \u03C33\xB7tan\xB2\u03B1 + Rc\uFF08\u03B1 \u4E3A\u7834\u65AD\u89D2\uFF09

## Hoek-Brown\uFF082002\uFF09
- mb = mi\xB7exp[(GSI\u2212100)/(28\u221214D)]
- s = exp[(GSI\u2212100)/(9\u22123D)]
- a = 0.5 + [exp(\u2212GSI/15) \u2212 exp(\u221220/3)]/6
- \u03C31 = \u03C33 + \u03C3ci\xB7(mb\xB7\u03C33/\u03C3ci + s)^a

## \u5CA9\u4F53\u5206\u7EA7
- RQD = \u03A3(\u226510 cm \u6BB5\u957F) / \u603B\u8FDB\u5C3A \xD7100%
- RMR89 = UCS + RQD + \u95F4\u8DDD + \u8282\u7406\u6761\u4EF6 + \u5730\u4E0B\u6C34 + \u65B9\u5411\u4FEE\u6B63
- GSI \u2248 RMR89 \u2212 5\uFF08RMR > 23\uFF09

## \u5730\u5E94\u529B
- \u03C3v = \u03B3H\uFF08\u03B3 kN/m\xB3\u3001H m \u2192 kPa\uFF0C\u518D \xF71000 \u5F97 MPa\uFF09
- \u03C3h = \u03BB\u03C3v
- \u91D1\u5C3C\u514B\uFF1A\u03BB = \u03BD/(1\u2212\u03BD)

## \u56F4\u5CA9\u5E94\u529B\uFF08Kirsch\uFF0C\u7850\u58C1 r=a\uFF09
- \u03C3r = 0
- \u03C3\u03B8 = (\u03C3h+\u03C3v) \u2212 2(\u03C3h\u2212\u03C3v)cos2\u03B8
- \u03B8=0\uFF08\u6C34\u5E73\u8F74\uFF09\uFF1A\u03C3\u03B8 = 3\u03C3v \u2212 \u03C3h
- \u03B8=90\xB0\uFF08\u5782\u76F4\u8F74\uFF09\uFF1A\u03C3\u03B8 = 3\u03C3h \u2212 \u03C3v

## \u8FB9\u5761
- \u65E0\u9650\u8FB9\u5761\uFF1AFS = [c\u2032 + (\u03B3z cos\xB2\u03B2 \u2212 u)tan\u03C6\u2032] / (\u03B3z sin\u03B2 cos\u03B2)
- \u5E73\u9762\u6ED1\u52A8\uFF1AFS = [cL + (Wcos\u03B1 \u2212 U)tan\u03C6] / (Wsin\u03B1)
- L = H/sin\u03B1\uFF1BW = 0.5\u03B3H\xB2(cot\u03B1 \u2212 cot\u03B2)\uFF1BU = u\xB7L

## \u4E8C\u7EF4\u5E94\u529B\u53D8\u6362
- \u03C3n = (\u03C3x+\u03C3y)/2 + (\u03C3x\u2212\u03C3y)/2\xB7cos2\u03B8 + \u03C4xy\xB7sin2\u03B8
- \u03C4 = \u2212(\u03C3x\u2212\u03C3y)/2\xB7sin2\u03B8 + \u03C4xy\xB7cos2\u03B8
- \u03C31,3 = (\u03C3x+\u03C3y)/2 \xB1 \u221A[((\u03C3x\u2212\u03C3y)/2)\xB2 + \u03C4xy\xB2]
`;

// src/mcp/resources.ts
var LAST_MODIFIED = "2026-11-23T00:00:00Z";
function byteLength(text) {
  return new TextEncoder().encode(text).length;
}
var RESOURCES = [
  {
    uri: "rock://concepts",
    name: "\u5CA9\u77F3\u529B\u5B66\u8003\u70B9",
    title: "\u5CA9\u77F3\u529B\u5B66\u8003\u70B9\uFF0835 \u6761\uFF09",
    description: "35 \u4E2A\u6838\u5FC3\u6982\u5FF5\u7684\u81EA\u5199\u6458\u8981\uFF0C\u542B\u5B9A\u4E49\u3001\u5173\u952E\u70B9\u4E0E\u6613\u9519\u63D0\u793A\u3002",
    mimeType: "text/markdown",
    size: byteLength(CONCEPTS_MD),
    annotations: {
      audience: ["user", "assistant"],
      priority: 0.9,
      lastModified: LAST_MODIFIED
    },
    text: CONCEPTS_MD
  },
  {
    uri: "rock://misconceptions",
    name: "\u9AD8\u9891\u9519\u56E0\u56FE\u8C31",
    title: "\u9AD8\u9891\u9519\u56E0\u56FE\u8C31\uFF0820 \u7C7B\uFF09",
    description: "20 \u7C7B\u9AD8\u9891\u9519\u56E0\uFF1A\u9519\u8BEF\u8868\u73B0\u3001\u6B63\u786E\u7406\u89E3\u3001\u53EF\u68C0\u6D4B\u7EBF\u7D22\u3002",
    mimeType: "text/markdown",
    size: byteLength(MISCONCEPTIONS_MD),
    annotations: {
      audience: ["assistant"],
      priority: 1,
      lastModified: LAST_MODIFIED
    },
    text: MISCONCEPTIONS_MD
  },
  {
    uri: "rock://formulas",
    name: "\u516C\u5F0F\u4E0E\u5355\u4F4D\u7EA6\u5B9A",
    title: "\u516C\u5F0F\u4E0E\u5355\u4F4D\u7EA6\u5B9A",
    description: "\u5355\u8F74\u3001\u6469\u5C14-\u5E93\u4ED1\u3001Hoek-Brown\u3001RMR/GSI\u3001\u5730\u5E94\u529B\u3001Kirsch\u3001\u8FB9\u5761\u3001\u5E94\u529B\u53D8\u6362\u516C\u5F0F\u3002",
    mimeType: "text/markdown",
    size: byteLength(FORMULAS_MD),
    annotations: {
      audience: ["assistant"],
      priority: 1,
      lastModified: LAST_MODIFIED
    },
    text: FORMULAS_MD
  }
];
function listResources() {
  return RESOURCES.map((r) => ({
    uri: r.uri,
    name: r.name,
    title: r.title,
    description: r.description,
    mimeType: r.mimeType,
    size: r.size,
    annotations: r.annotations
  }));
}
var ResourceNotFoundError = class extends Error {
  code = -32002;
  constructor(uri) {
    super(`Resource not found: ${uri}`);
    this.name = "ResourceNotFoundError";
  }
};
function readResource(uri) {
  const resource = RESOURCES.find((r) => r.uri === uri);
  if (!resource) throw new ResourceNotFoundError(uri);
  return {
    contents: [
      {
        uri: resource.uri,
        mimeType: resource.mimeType,
        text: resource.text
      }
    ]
  };
}

// src/tools/rock.ts
var DEG = Math.PI / 180;
function assertFinite(name, value) {
  if (!Number.isFinite(value)) throw new Error(`${name} \u5FC5\u987B\u662F\u6709\u9650\u6570\u503C`);
}
function mohrCoulombSigma1({ c, phi, sigma3 }) {
  assertFinite("c", c);
  assertFinite("phi", phi);
  assertFinite("sigma3", sigma3);
  if (c < 0) throw new Error("c \u4E0D\u80FD\u4E3A\u8D1F");
  if (phi <= 0 || phi >= 90) throw new Error("phi \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  const k = Math.tan((45 + phi / 2) * DEG);
  return sigma3 * k * k + 2 * c * k;
}
function mohrCoulombFS(c, phi, sigma1, sigma3) {
  assertFinite("c", c);
  assertFinite("phi", phi);
  assertFinite("sigma1", sigma1);
  assertFinite("sigma3", sigma3);
  if (c < 0) throw new Error("c \u4E0D\u80FD\u4E3A\u8D1F");
  if (phi <= 0 || phi >= 90) throw new Error("phi \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  if (sigma1 <= sigma3) throw new Error("\u03C31 \u5FC5\u987B\u5927\u4E8E \u03C33");
  const p = phi * DEG;
  return (2 * c * Math.cos(p) + (sigma1 + sigma3) * Math.sin(p)) / (sigma1 - sigma3);
}
function hoekBrownSigma1({
  sigmaCi,
  gsi,
  mi,
  D = 0,
  sigma3
}) {
  assertFinite("sigmaCi", sigmaCi);
  assertFinite("gsi", gsi);
  assertFinite("mi", mi);
  assertFinite("D", D);
  assertFinite("sigma3", sigma3);
  if (sigmaCi <= 0) throw new Error("\u03C3ci \u5FC5\u987B\u4E3A\u6B63");
  if (gsi < 0 || gsi > 100) throw new Error("GSI \u9700\u5728 0\u2013100");
  if (mi <= 0) throw new Error("mi \u5FC5\u987B\u4E3A\u6B63");
  if (D < 0 || D > 1) throw new Error("D \u9700\u5728 0\u20131");
  const mb = mi * Math.exp((gsi - 100) / (28 - 14 * D));
  const s = Math.exp((gsi - 100) / (9 - 3 * D));
  const a = 0.5 + (Math.exp(-gsi / 15) - Math.exp(-20 / 3)) / 6;
  const term = mb * sigma3 / sigmaCi + s;
  return sigma3 + sigmaCi * Math.pow(Math.max(term, 0), a);
}
function planeStress(sigma1, sigma3, thetaDeg) {
  assertFinite("sigma1", sigma1);
  assertFinite("sigma3", sigma3);
  assertFinite("theta", thetaDeg);
  if (sigma1 < sigma3) throw new Error("\u03C31 \u4E0D\u80FD\u5C0F\u4E8E \u03C33");
  const t = thetaDeg * DEG;
  return {
    sigmaN: (sigma1 + sigma3) / 2 + (sigma1 - sigma3) / 2 * Math.cos(2 * t),
    tau: (sigma1 - sigma3) / 2 * Math.sin(2 * t)
  };
}
function shearStrength(c, phi, sigma) {
  assertFinite("c", c);
  assertFinite("phi", phi);
  assertFinite("sigma", sigma);
  if (c < 0) throw new Error("c \u4E0D\u80FD\u4E3A\u8D1F");
  if (phi <= 0 || phi >= 90) throw new Error("phi \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  return c + sigma * Math.tan(phi * DEG);
}
function solveUniaxialMohrCoulomb({
  D,
  P,
  alpha,
  sigma3 = 0
}) {
  assertFinite("D", D);
  assertFinite("P", P);
  assertFinite("alpha", alpha);
  assertFinite("sigma3", sigma3);
  if (D <= 0) throw new Error("D \u5FC5\u987B\u4E3A\u6B63");
  if (P <= 0) throw new Error("P \u5FC5\u987B\u4E3A\u6B63");
  if (alpha <= 45 || alpha >= 90) throw new Error("\u03B1 \u9700\u5728 (45, 90) \u5EA6\u4E4B\u95F4");
  const area = Math.PI * (D / 2) ** 2;
  const Rc = P * 1e3 / area;
  const phi = 2 * alpha - 90;
  const p = phi * DEG;
  const c = Rc * (1 - Math.sin(p)) / (2 * Math.cos(p));
  const theta = alpha * DEG;
  const sigmaN = Rc / 2 + Rc / 2 * Math.cos(2 * theta);
  const tau = Rc / 2 * Math.sin(2 * theta);
  const tauF = c + sigmaN * Math.tan(p);
  const sigma1 = sigma3 * Math.tan(theta) ** 2 + Rc;
  return { area, Rc, phi, c, sigmaN, tau, tauF, sigma1 };
}
function rqd(runs2) {
  if (runs2.length === 0) throw new Error("\u5CA9\u82AF\u6BB5\u4E0D\u80FD\u4E3A\u7A7A");
  for (const r of runs2) {
    assertFinite("\u5CA9\u82AF\u6BB5\u957F\u5EA6", r);
    if (r < 0) throw new Error("\u5CA9\u82AF\u6BB5\u957F\u5EA6\u4E0D\u80FD\u4E3A\u8D1F");
  }
  const total = runs2.reduce((sum, r) => sum + r, 0);
  if (total <= 0) throw new Error("\u603B\u8FDB\u5C3A\u5FC5\u987B\u5927\u4E8E 0");
  const intact = runs2.filter((r) => r >= 0.1).reduce((sum, r) => sum + r, 0);
  return intact / total * 100;
}
function infiniteSlopeFS({
  c,
  phi,
  gamma,
  z,
  beta,
  u = 0
}) {
  assertFinite("c", c);
  assertFinite("phi", phi);
  assertFinite("gamma", gamma);
  assertFinite("z", z);
  assertFinite("beta", beta);
  assertFinite("u", u);
  if (c < 0) throw new Error("c \u4E0D\u80FD\u4E3A\u8D1F");
  if (phi <= 0 || phi >= 90) throw new Error("phi \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  if (gamma <= 0) throw new Error("\u03B3 \u5FC5\u987B\u4E3A\u6B63");
  if (z <= 0) throw new Error("z \u5FC5\u987B\u4E3A\u6B63");
  if (beta <= 0 || beta >= 90) throw new Error("\u03B2 \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  const b = beta * DEG;
  const numerator = c + (gamma * z * Math.cos(b) ** 2 - u) * Math.tan(phi * DEG);
  const denominator = gamma * z * Math.sin(b) * Math.cos(b);
  return numerator / denominator;
}
function insituStress({
  gamma,
  H,
  nu,
  lambda
}) {
  assertFinite("gamma", gamma);
  assertFinite("H", H);
  if (gamma <= 0) throw new Error("\u03B3 \u5FC5\u987B\u4E3A\u6B63");
  if (H <= 0) throw new Error("H \u5FC5\u987B\u4E3A\u6B63");
  let lam = lambda;
  if (lam === void 0) {
    if (nu === void 0) throw new Error("\u9700\u8981 nu \u6216 lambda \u4E4B\u4E00");
    assertFinite("nu", nu);
    if (nu <= 0 || nu >= 0.5) throw new Error("\u03BD \u9700\u5728 (0, 0.5) \u4E4B\u95F4");
    lam = nu / (1 - nu);
  }
  if (lam <= 0) throw new Error("\u03BB \u5FC5\u987B\u4E3A\u6B63");
  const sigmaV = gamma * H / 1e3;
  const sigmaH = lam * sigmaV;
  return { sigmaV, sigmaH, lambda: lam };
}
function kirsch({
  sigmaH,
  sigmaV,
  a,
  r,
  theta
}) {
  assertFinite("sigmaH", sigmaH);
  assertFinite("sigmaV", sigmaV);
  assertFinite("a", a);
  assertFinite("r", r);
  assertFinite("theta", theta);
  if (a <= 0) throw new Error("a \u5FC5\u987B\u4E3A\u6B63");
  if (r < a) throw new Error("r \u4E0D\u80FD\u5C0F\u4E8E a");
  const avg = (sigmaH + sigmaV) / 2;
  const diff = (sigmaH - sigmaV) / 2;
  const a2 = a * a;
  const r2 = r * r;
  const t = theta * DEG;
  const sigmaR = avg * (1 - a2 / r2) + diff * (1 - 4 * a2 / r2 + 3 * a2 * a2 / (r2 * r2)) * Math.cos(2 * t);
  const sigmaTheta = avg * (1 + a2 / r2) - diff * (1 + 3 * a2 * a2 / (r2 * r2)) * Math.cos(2 * t);
  const tauRTheta = -diff * (1 + 2 * a2 / r2 - 3 * a2 * a2 / (r2 * r2)) * Math.sin(2 * t);
  return { sigmaR, sigmaTheta, tauRTheta };
}
function rateUcs(ucs) {
  if (ucs > 250) return 15;
  if (ucs >= 100) return 12;
  if (ucs >= 50) return 7;
  if (ucs >= 25) return 4;
  if (ucs >= 5) return 2;
  if (ucs >= 1) return 1;
  return 0;
}
function rateRqd(rqd2) {
  if (rqd2 >= 90) return 20;
  if (rqd2 >= 75) return 17;
  if (rqd2 >= 50) return 13;
  if (rqd2 >= 25) return 8;
  return 3;
}
function rateSpacing(spacing) {
  if (spacing > 2) return 20;
  if (spacing >= 0.6) return 15;
  if (spacing >= 0.2) return 10;
  if (spacing >= 0.06) return 8;
  return 5;
}
function rmr89({
  ucs,
  rqd: rqdValue,
  spacing,
  condition,
  water,
  orientation = 0
}) {
  assertFinite("ucs", ucs);
  assertFinite("rqd", rqdValue);
  assertFinite("spacing", spacing);
  assertFinite("condition", condition);
  assertFinite("water", water);
  assertFinite("orientation", orientation);
  if (ucs < 0) throw new Error("ucs \u4E0D\u80FD\u4E3A\u8D1F");
  if (rqdValue < 0 || rqdValue > 100) throw new Error("RQD \u9700\u5728 0\u2013100");
  if (spacing <= 0) throw new Error("\u95F4\u8DDD\u5FC5\u987B\u4E3A\u6B63");
  if (condition < 0 || condition > 30) throw new Error("condition \u9700\u5728 0\u201330");
  if (water < 0 || water > 15) throw new Error("water \u9700\u5728 0\u201315");
  if (orientation < -12 || orientation > 0) {
    throw new Error("orientation \u9700\u5728 -12\u20130");
  }
  const ratings = {
    ucs: rateUcs(ucs),
    rqd: rateRqd(rqdValue),
    spacing: rateSpacing(spacing),
    condition,
    water,
    orientation
  };
  const rmr = ratings.ucs + ratings.rqd + ratings.spacing + ratings.condition + ratings.water + ratings.orientation;
  let className;
  let description;
  if (rmr >= 81) {
    className = "I";
    description = "\u5F88\u597D";
  } else if (rmr >= 61) {
    className = "II";
    description = "\u597D";
  } else if (rmr >= 41) {
    className = "III";
    description = "\u4E00\u822C";
  } else if (rmr >= 21) {
    className = "IV";
    description = "\u5DEE";
  } else {
    className = "V";
    description = "\u5F88\u5DEE";
  }
  return { rmr, className, description, ratings };
}
function gsiFromRmr(rmr) {
  assertFinite("rmr", rmr);
  if (rmr <= 23) {
    throw new Error("RMR \u2264 23 \u65F6 GSI = RMR \u2212 5 \u4E0D\u9002\u7528\uFF0C\u8BF7\u6539\u7528 Q \u6CD5\u6216\u5176\u4ED6\u7ECF\u9A8C\u5173\u7CFB");
  }
  return rmr - 5;
}
function planarWedgeFS({
  H,
  beta,
  alpha,
  gamma,
  c,
  phi,
  u = 0
}) {
  assertFinite("H", H);
  assertFinite("beta", beta);
  assertFinite("alpha", alpha);
  assertFinite("gamma", gamma);
  assertFinite("c", c);
  assertFinite("phi", phi);
  assertFinite("u", u);
  if (H <= 0) throw new Error("H \u5FC5\u987B\u4E3A\u6B63");
  if (gamma <= 0) throw new Error("\u03B3 \u5FC5\u987B\u4E3A\u6B63");
  if (c < 0) throw new Error("c \u4E0D\u80FD\u4E3A\u8D1F");
  if (phi <= 0 || phi >= 90) throw new Error("\u03C6 \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  if (beta <= 0 || beta >= 90) throw new Error("\u03B2 \u9700\u5728 (0, 90) \u5EA6\u4E4B\u95F4");
  if (alpha <= 0 || alpha >= beta) {
    throw new Error("\u6ED1\u9762\u503E\u89D2 \u03B1 \u9700\u6EE1\u8DB3 0 < \u03B1 < \u03B2");
  }
  const b = beta * DEG;
  const al = alpha * DEG;
  const L = H / Math.sin(al);
  const W = 0.5 * gamma * H * H * (1 / Math.tan(al) - 1 / Math.tan(b));
  if (W <= 0) throw new Error("\u6ED1\u5757\u81EA\u91CD\u8BA1\u7B97\u4E3A\u8D1F\uFF0C\u8BF7\u68C0\u67E5\u5761\u89D2\u4E0E\u6ED1\u9762\u503E\u89D2");
  const U = u * L;
  return (c * L + (W * Math.cos(al) - U) * Math.tan(phi * DEG)) / (W * Math.sin(al));
}
function stressTransform2D({
  sigmaX,
  sigmaY,
  tauXY,
  theta
}) {
  assertFinite("sigmaX", sigmaX);
  assertFinite("sigmaY", sigmaY);
  assertFinite("tauXY", tauXY);
  assertFinite("theta", theta);
  const avg = (sigmaX + sigmaY) / 2;
  const diff = (sigmaX - sigmaY) / 2;
  const t = theta * DEG;
  const sigmaN = avg + diff * Math.cos(2 * t) + tauXY * Math.sin(2 * t);
  const tau = -diff * Math.sin(2 * t) + tauXY * Math.cos(2 * t);
  const radius = Math.hypot(diff, tauXY);
  const principalAngle = 0.5 * Math.atan2(2 * tauXY, sigmaX - sigmaY) / DEG;
  return {
    sigmaN,
    tau,
    sigma1: avg + radius,
    sigma3: avg - radius,
    principalAngle
  };
}

// src/tools/diagnose.ts
var FIELDS = ["Rc", "phi", "c", "sigmaN", "tau", "tauF", "sigma1"];
var DEG2 = Math.PI / 180;
function relDiff(a, b) {
  return Math.abs(a - b) / Math.max(Math.abs(b), 1e-9);
}
function compare(student, expected) {
  const provided = FIELDS.filter(
    (f) => student[f] !== void 0 && expected[f] !== void 0
  );
  const matched = [];
  for (const f of provided) {
    const e = expected[f];
    if (relDiff(student[f], e) <= 0.05) matched.push(f);
  }
  return {
    score: provided.length === 0 ? 0 : matched.length / provided.length,
    matched,
    provided
  };
}
var MODELS = [
  {
    code: "CORRECT",
    label: "\u7ED3\u679C\u6B63\u786E",
    build: (correct) => ({
      Rc: correct.Rc,
      phi: correct.phi,
      c: correct.c,
      sigmaN: correct.sigmaN,
      tau: correct.tau,
      tauF: correct.tauF,
      sigma1: correct.sigma1
    })
  },
  {
    code: "MISSING_FACTOR_2_IN_C",
    label: "\u5185\u805A\u529B c \u7684\u5206\u6BCD\u6F0F\u4E86 2\uFF08c \u7FFB\u500D\uFF09",
    build: (correct) => ({
      phi: correct.phi,
      c: correct.c * 2,
      sigmaN: correct.sigmaN,
      tau: correct.tau,
      tauF: correct.c * 2 + correct.sigmaN * Math.tan(correct.phi * DEG2),
      sigma1: correct.sigma1
    })
  },
  {
    code: "SIGMA3_ZERO",
    label: "\u52A0\u56F4\u538B\u540E\u4ECD\u7528\u5355\u8F74\u5F3A\u5EA6\uFF08\u03C33 \u53D6 0\uFF09",
    build: (correct) => ({
      phi: correct.phi,
      c: correct.c,
      sigmaN: correct.sigmaN,
      tau: correct.tau,
      tauF: correct.tauF,
      sigma1: correct.Rc
    })
  },
  {
    code: "ANGLE_LOAD_AXIS",
    label: "\u7834\u65AD\u89D2\u53E3\u5F84\u7528\u9519\uFF08\u6309\u4E0E\u8377\u8F7D\u8F74/\u6700\u5927\u4E3B\u5E94\u529B\u8F74\u7684\u5939\u89D2\u7B97\uFF09",
    build: (correct, input) => {
      const theta2 = 90 - input.alpha;
      const phi2 = Math.abs(90 - 2 * input.alpha);
      if (theta2 <= 0 || theta2 >= 90 || phi2 <= 0 || phi2 >= 90) {
        return {
          sigmaN: correct.Rc / 2 + correct.Rc / 2 * Math.cos(2 * theta2 * DEG2),
          tau: correct.Rc / 2 * Math.sin(2 * theta2 * DEG2)
        };
      }
      const p2 = phi2 * DEG2;
      const c2 = correct.Rc * (1 - Math.sin(p2)) / (2 * Math.cos(p2));
      const sigmaN2 = correct.Rc / 2 + correct.Rc / 2 * Math.cos(2 * theta2 * DEG2);
      const tau2 = correct.Rc / 2 * Math.sin(2 * theta2 * DEG2);
      return {
        phi: phi2,
        c: c2,
        sigmaN: sigmaN2,
        tau: tau2,
        tauF: c2 + sigmaN2 * Math.tan(p2),
        sigma1: (input.sigma3 ?? 0) * Math.tan(theta2 * DEG2) ** 2 + correct.Rc
      };
    }
  },
  {
    code: "AREA_PI_D2",
    label: "\u622A\u9762\u79EF\u7528\u6210 \u03C0D\xB2\uFF08\u5C11\u9664\u4EE5 4\uFF09",
    build: (correct, input) => {
      const Rc2 = correct.Rc / 4;
      const p = correct.phi * DEG2;
      const c2 = Rc2 * (1 - Math.sin(p)) / (2 * Math.cos(p));
      const sigmaN2 = Rc2 / 2 + Rc2 / 2 * Math.cos(2 * input.alpha * DEG2);
      const tau2 = Rc2 / 2 * Math.sin(2 * input.alpha * DEG2);
      return {
        Rc: Rc2,
        phi: correct.phi,
        c: c2,
        sigmaN: sigmaN2,
        tau: tau2,
        tauF: c2 + sigmaN2 * Math.tan(p),
        sigma1: (input.sigma3 ?? 0) * Math.tan(input.alpha * DEG2) ** 2 + Rc2
      };
    }
  },
  {
    code: "UNIT_P_N",
    label: "\u8377\u8F7D\u5355\u4F4D\u9519\uFF08kN \u5F53\u6210 N\uFF0C\u6216\u6F0F\u4E58 1000\uFF09",
    build: (correct, input) => {
      const Rc2 = correct.Rc / 1e3;
      const p = correct.phi * DEG2;
      const c2 = Rc2 * (1 - Math.sin(p)) / (2 * Math.cos(p));
      const sigmaN2 = Rc2 / 2 + Rc2 / 2 * Math.cos(2 * input.alpha * DEG2);
      const tau2 = Rc2 / 2 * Math.sin(2 * input.alpha * DEG2);
      return {
        Rc: Rc2,
        phi: correct.phi,
        c: c2,
        sigmaN: sigmaN2,
        tau: tau2,
        tauF: c2 + sigmaN2 * Math.tan(p),
        sigma1: (input.sigma3 ?? 0) * Math.tan(input.alpha * DEG2) ** 2 + Rc2
      };
    }
  },
  {
    code: "TAU_MISSING_HALF",
    label: "\u526A\u5E94\u529B \u03C4 \u7684 1/2 \u6F0F\u4E86",
    build: (correct) => ({
      phi: correct.phi,
      c: correct.c,
      sigmaN: correct.sigmaN,
      tau: correct.tau * 2,
      tauF: correct.tauF,
      sigma1: correct.sigma1
    })
  },
  {
    code: "SIGMA_N_SIGN",
    label: "\u7834\u574F\u9762\u6B63\u5E94\u529B cos2\u03B8 \u524D\u7684\u7B26\u53F7\u7528\u53CD\u4E86",
    build: (correct, input) => {
      const sigmaN2 = correct.Rc / 2 - correct.Rc / 2 * Math.cos(2 * input.alpha * DEG2);
      return {
        phi: correct.phi,
        c: correct.c,
        sigmaN: sigmaN2,
        tau: correct.tau,
        tauF: correct.c + sigmaN2 * Math.tan(correct.phi * DEG2),
        sigma1: correct.sigma1
      };
    }
  },
  {
    code: "TAN_NOT_SQUARED",
    label: "\u6781\u9650\u4E3B\u5E94\u529B\u516C\u5F0F\u91CC tan\u03B8 \u6CA1\u5E73\u65B9",
    build: (correct, input) => ({
      phi: correct.phi,
      c: correct.c,
      sigmaN: correct.sigmaN,
      tau: correct.tau,
      tauF: correct.tauF,
      sigma1: (input.sigma3 ?? 0) * Math.tan(input.alpha * DEG2) + correct.Rc
    })
  },
  {
    code: "PHI_AS_RADIANS",
    label: "\u03C6 \u76F4\u63A5\u5F53\u5F27\u5EA6\u4EE3\u5165\u4E09\u89D2\u51FD\u6570",
    build: (correct) => {
      const phiRad = correct.phi;
      const c2 = correct.Rc * (1 - Math.sin(phiRad)) / (2 * Math.cos(phiRad));
      return {
        phi: correct.phi,
        c: c2,
        tauF: c2 + correct.sigmaN * Math.tan(phiRad)
      };
    }
  },
  {
    code: "SIGMA_N_AVERAGE",
    label: "\u7834\u574F\u9762\u6B63\u5E94\u529B\u53EA\u53D6\u4E86\u5E73\u5747\u503C\uFF08\u6F0F\u6389 cos2\u03B8 \u9879\uFF09",
    build: (correct) => {
      const sigmaN2 = correct.Rc / 2;
      return {
        phi: correct.phi,
        c: correct.c,
        sigmaN: sigmaN2,
        tau: correct.tau,
        tauF: correct.c + sigmaN2 * Math.tan(correct.phi * DEG2),
        sigma1: correct.sigma1
      };
    }
  },
  {
    code: "TAN_PHI_NOT_ALPHA",
    label: "\u6781\u9650\u4E3B\u5E94\u529B\u7528\u4E86 tan\xB2\u03C6\uFF0C\u800C\u4E0D\u662F tan\xB2(45\xB0+\u03C6/2)",
    build: (correct, input) => {
      if (!input.sigma3) return {};
      return {
        phi: correct.phi,
        c: correct.c,
        sigmaN: correct.sigmaN,
        tau: correct.tau,
        tauF: correct.tauF,
        sigma1: input.sigma3 * Math.tan(correct.phi * DEG2) ** 2 + correct.Rc
      };
    }
  }
];
function evidenceFor(candidate, correct, student) {
  if (candidate.code === "CORRECT") return "\u5404\u5206\u6B65\u7ED3\u679C\u4E0E\u6807\u51C6\u7B54\u6848\u4E00\u81F4\u3002";
  const matched = candidate.expected;
  const matches = (f) => student[f] !== void 0 && matched[f] !== void 0 && relDiff(student[f], matched[f]) <= 0.05;
  let best = null;
  let bestDiff = 0;
  for (const f of FIELDS) {
    if (!matches(f)) continue;
    const d = relDiff(matched[f], correct[f]);
    if (d > bestDiff) {
      bestDiff = d;
      best = f;
    }
  }
  if (!best) {
    return `${candidate.label}\uFF1A\u4F60\u7684\u7B54\u6848\u4E0E\u8BE5\u6A21\u5F0F\u53EA\u6709\u90E8\u5206\u543B\u5408\uFF0C\u8BC1\u636E\u4E0D\u8DB3\u3002`;
  }
  const s = student[best];
  const c = correct[best];
  const e = matched[best];
  const ratio = c === 0 ? 0 : s / c;
  const ratioText = Math.abs(ratio - 1) > 0.05 ? `\uFF0C\u4F60\u7684\u7ED3\u679C\u662F\u6B63\u786E\u503C\u7684 ${ratio.toFixed(2)} \u500D` : "";
  return `\u4F60\u63D0\u4EA4\u7684 ${best}=${s.toFixed(4)}\uFF0C\u4E0E\u201C${candidate.label}\u201D\u7684\u91CD\u7B97\u7ED3\u679C ${e.toFixed(
    4
  )} \u543B\u5408\uFF1B\u6B63\u786E\u503C\u662F ${c.toFixed(4)}${ratioText}\u3002`;
}
function diagnoseUniaxialError(input, student) {
  const correct = solveUniaxialMohrCoulomb(input);
  const providedCount = FIELDS.filter((f) => student[f] !== void 0).length;
  if (providedCount === 0) {
    throw new Error("\u81F3\u5C11\u63D0\u4F9B\u4E00\u9879\u5B66\u751F\u7B54\u6848\uFF08phi/c/sigmaN/tau/tauF/sigma1\uFF09");
  }
  const candidates = [];
  for (const model of MODELS) {
    const expected = model.build(correct, input);
    if (Object.keys(expected).length > 0 && expected.Rc === void 0) {
      expected.Rc = correct.Rc;
    }
    const { score, matched, provided } = compare(student, expected);
    if (score <= 0) continue;
    const evidenceFactor = Math.min(1, providedCount / 3);
    const confidence = score * evidenceFactor;
    if (confidence < 0.2) continue;
    candidates.push({
      code: model.code,
      label: model.label,
      confidence,
      evidence: "",
      expected,
      matched,
      provided
    });
  }
  candidates.sort((a, b) => b.confidence - a.confidence);
  for (const candidate of candidates) {
    candidate.evidence = evidenceFor(candidate, correct, student);
  }
  const top = candidates[0];
  const second = candidates[1];
  let verdict;
  if (!top) {
    verdict = "\u65E0\u6CD5\u5F52\u56E0\uFF1A\u5B66\u751F\u7B54\u6848\u4E0E\u4EFB\u4F55\u5DF2\u77E5\u9519\u8BEF\u6A21\u578B\u90FD\u4E0D\u5339\u914D\uFF0C\u5EFA\u8BAE\u6309\u8BA1\u7B97\u5931\u8BEF\u5904\u7406\u3002";
  } else if (top.code === "CORRECT" && top.confidence >= 0.8) {
    verdict = "\u7ED3\u679C\u6B63\u786E\u3002";
  } else if (top.confidence < 0.5) {
    verdict = "\u8BC1\u636E\u4E0D\u8DB3\uFF1A\u53EF\u80FD\u6709\u591A\u5904\u9519\u8BEF\u53E0\u52A0\uFF0C\u5EFA\u8BAE\u5148\u6838\u5BF9\u5DF2\u77E5\u91CF\u4E0E\u5355\u4F4D\u3002";
  } else if (second && second.code !== "CORRECT" && top.confidence - second.confidence < 0.15) {
    verdict = `\u5B58\u5728\u4E24\u79CD\u53EF\u80FD\uFF1A${top.label} / ${second.label}\uFF1B\u5EFA\u8BAE\u8865\u5145\u4E2D\u95F4\u6B65\u9AA4\u6216\u6838\u5BF9\u5355\u4F4D\u540E\u518D\u5224\u5B9A\u3002`;
  } else {
    verdict = `\u6700\u53EF\u80FD\u7684\u9519\u56E0\uFF1A${top.label}\u3002`;
  }
  return { correct, verdict, candidates: candidates.slice(0, 4) };
}
function diagnoseBatch(cases) {
  return cases.map((item) => {
    const result = diagnoseUniaxialError(
      { D: item.D, P: item.P, alpha: item.alpha, sigma3: item.sigma3 },
      item.student
    );
    const top = result.candidates[0];
    return {
      id: item.id,
      verdict: result.verdict,
      topCode: top?.code ?? null,
      topLabel: top?.label ?? null,
      confidence: top?.confidence ?? 0
    };
  });
}
var ERROR_MODELS = MODELS.filter((m) => m.code !== "CORRECT").map(
  (m) => ({ code: m.code, label: m.label })
);
function simulateErrorModel(code, input) {
  const model = MODELS.find((m) => m.code === code);
  if (!model) throw new Error(`\u672A\u77E5\u9519\u8BEF\u6A21\u578B\uFF1A${code}`);
  const correct = solveUniaxialMohrCoulomb(input);
  return model.build(correct, input);
}
function fitMohrCoulombFromTriaxial(points) {
  if (points.length < 2) throw new Error("\u81F3\u5C11\u9700\u8981 2 \u4E2A\u4E09\u8F74\u8BD5\u9A8C\u70B9");
  const n = points.length;
  const xs = points.map((p) => p.sigma3);
  const ys = points.map((p) => p.sigma1);
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = xs[i] - mx;
    const dy = ys[i] - my;
    sxx += dx * dx;
    sxy += dx * dy;
    syy += dy * dy;
  }
  if (sxx === 0) throw new Error("\u03C33 \u4E0D\u80FD\u5168\u90E8\u76F8\u540C");
  const slope = sxy / sxx;
  const intercept = my - slope * mx;
  if (slope <= 1) throw new Error("\u62DF\u5408\u659C\u7387\u9700\u5927\u4E8E 1\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E");
  const r2 = syy === 0 ? 1 : sxy * sxy / (sxx * syy);
  const theta = Math.atan(Math.sqrt(slope)) / DEG2;
  const phi = 2 * theta - 90;
  const c = intercept / (2 * Math.tan(theta * DEG2));
  return { phi, c, Rc: intercept, slope, intercept, r2 };
}

// src/tools/variants.ts
var PRIMARY_FIELD = {
  MISSING_FACTOR_2_IN_C: "c",
  SIGMA3_ZERO: "sigma1",
  ANGLE_LOAD_AXIS: "sigmaN",
  AREA_PI_D2: "Rc",
  UNIT_P_N: "Rc",
  TAU_MISSING_HALF: "tau",
  SIGMA_N_SIGN: "sigmaN",
  TAN_NOT_SQUARED: "sigma1",
  PHI_AS_RADIANS: "c",
  SIGMA_N_AVERAGE: "sigmaN",
  TAN_PHI_NOT_ALPHA: "sigma1"
};
var HINTS = {
  MISSING_FACTOR_2_IN_C: "\u5148\u786E\u8BA4 c \u7684\u516C\u5F0F\u5206\u6BCD\u662F 2cos\u03C6\uFF0C\u4E0D\u662F cos\u03C6\u3002",
  SIGMA3_ZERO: "\u03C33 \u4E0D\u4E3A 0 \u65F6\uFF0C\u03C31 \u91CC\u5FC5\u987B\u6709 \u03C33\xB7tan\xB2\u03B1 \u8FD9\u4E00\u9879\u3002",
  ANGLE_LOAD_AXIS: "\u03B1 \u662F\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\uFF0C\u4E0D\u662F\u4E0E\u8377\u8F7D\u8F74\u7684\u5939\u89D2\u3002",
  AREA_PI_D2: "\u622A\u9762\u79EF\u662F \u03C0D\xB2/4\uFF0C\u4E0D\u662F \u03C0D\xB2\u3002",
  UNIT_P_N: "\u8377\u8F7D\u5355\u4F4D\u662F kN\uFF0C\u4EE3\u5165\u65F6\u4E58 1000 \u6362\u6210 N\u3002",
  TAU_MISSING_HALF: "\u526A\u5E94\u529B\u7684\u516C\u5F0F\u91CC\u6709 1/2\uFF0C\u522B\u6F0F\u3002",
  SIGMA_N_SIGN: "\u7834\u574F\u9762\u6B63\u5E94\u529B\u91CC cos2\u03B8 \u7684\u7B26\u53F7\u8981\u770B\u6E05\u3002",
  TAN_NOT_SQUARED: "\u6781\u9650\u4E3B\u5E94\u529B\u91CC\u7684 tan \u8981\u5E73\u65B9\u3002",
  PHI_AS_RADIANS: "\u4E09\u89D2\u51FD\u6570\u91CC\u7684 \u03C6 \u662F\u89D2\u5EA6\uFF0C\u4E0D\u662F\u5F27\u5EA6\u3002",
  SIGMA_N_AVERAGE: "\u6B63\u5E94\u529B\u4E0D\u53EA\u6709\u5E73\u5747\u503C\uFF0C\u8FD8\u6709 cos2\u03B8 \u9879\u3002",
  TAN_PHI_NOT_ALPHA: "tan \u91CC\u662F 45\xB0+\u03C6/2\uFF0C\u4E0D\u662F \u03C6\u3002"
};
function problemText(base) {
  const confined = (base.sigma3 ?? 0) !== 0;
  const height = base.D * 2;
  const prefix = `\u76F4\u5F84 ${base.D} mm\u3001\u9AD8 ${height} mm \u7684\u6807\u51C6\u5706\u67F1\u8BD5\u6837`;
  const load = confined ? `\u56F4\u538B \u03C33 = ${base.sigma3} MPa\uFF0C\u8F74\u5411\u538B\u7F29\u81F3 ${base.P} kN \u65F6\u7834\u574F` : `\u5355\u8F74\u538B\u7F29\u81F3 ${base.P} kN \u65F6\u7834\u574F`;
  const ask = confined ? "\u6C42 Rc\u3001\u03C6\u3001c\u3001\u7834\u574F\u9762 \u03C3n\u3001\u03C4\u3001\u03C4f\uFF0C\u4EE5\u53CA\u8BE5\u56F4\u538B\u4E0B\u7684 \u03C31\u3002" : "\u6C42 Rc\u3001\u03C6\u3001c\u3001\u7834\u574F\u9762 \u03C3n\u3001\u03C4\u3001\u03C4f\u3002";
  return `${prefix}\uFF0C${load}\u3002\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\u4E3A ${base.alpha}\xB0\u3002${ask}`;
}
function perturbations(base) {
  const out = [];
  for (const alpha of [55, 57, 62, 65, 68, 52, 70]) {
    out.push({ ...base, alpha });
  }
  for (const P of [45, 47, 52, 55, 58]) {
    out.push({ ...base, P });
  }
  for (const D of [46, 48, 52, 54]) {
    out.push({ ...base, D });
  }
  for (const sigma3 of [5, 10, 15, 20]) {
    out.push({ ...base, sigma3 });
  }
  return out;
}
function generateVariants({
  targetError,
  count = 3,
  base = { D: 50, P: 49.09, alpha: 60, sigma3: 0 }
}) {
  const meta = ERROR_MODELS.find((m) => m.code === targetError);
  const field = PRIMARY_FIELD[targetError];
  if (!meta || !field) {
    throw new Error(`\u4E0D\u652F\u6301\u7684\u76EE\u6807\u9519\u56E0\uFF1A${targetError}`);
  }
  const max = Math.min(3, Math.max(1, count));
  const seen = /* @__PURE__ */ new Set();
  const results = [];
  for (const candidate of perturbations(base)) {
    if (candidate.alpha <= 45 || candidate.alpha >= 90) continue;
    if (candidate.D <= 0 || candidate.P <= 0) continue;
    if ((candidate.sigma3 ?? 0) < 0) continue;
    const key = `${candidate.D}|${candidate.P}|${candidate.alpha}|${candidate.sigma3 ?? 0}`;
    if (seen.has(key)) continue;
    const standard = solveUniaxialMohrCoulomb(candidate);
    const expected = simulateErrorModel(targetError, candidate);
    const wrong = expected[field];
    if (wrong === void 0 || !Number.isFinite(wrong)) continue;
    const correct = standard[field];
    const difference = Math.abs(wrong - correct) / Math.max(Math.abs(correct), 1e-9);
    if (difference <= 0.05) continue;
    seen.add(key);
    results.push({
      id: `V${results.length + 1}`,
      problemText: problemText(candidate),
      parameters: candidate,
      targetError,
      targetErrorLabel: meta.label,
      standard,
      trap: {
        field,
        value: wrong,
        differencePct: Math.round(difference * 1e3) / 10
      },
      hint: HINTS[targetError] ?? "\u5148\u68C0\u67E5\u516C\u5F0F\u548C\u5355\u4F4D\uFF0C\u518D\u4EE3\u5165\u8BA1\u7B97\u3002"
    });
    if (results.length >= max) break;
  }
  if (results.length === 0) {
    throw new Error(
      `\u65E0\u6CD5\u4E3A ${targetError} \u751F\u6210\u6709\u533A\u5206\u5EA6\u7684\u53D8\u5F0F\uFF1B\u8BF7\u66F4\u6362\u57FA\u7840\u53C2\u6570\u6216\u76EE\u6807\u9519\u56E0\u3002`
    );
  }
  return results;
}

// src/mcp/tools.ts
var ToolInputError = class extends Error {
  data;
  constructor(message, data) {
    super(message);
    this.name = "ToolInputError";
    this.data = data;
  }
};
var COMPUTE_TOPIC_NAMES = [
  "uniaxial",
  "mohr_coulomb_sigma1",
  "mohr_coulomb_fs",
  "hoek_brown",
  "rqd",
  "infinite_slope",
  "plane_stress",
  "shear_strength",
  "insitu_stress",
  "kirsch",
  "rmr89",
  "gsi_from_rmr",
  "planar_wedge",
  "stress_transform",
  "triaxial_fit"
];
var COMPUTE_TOPICS = {
  uniaxial: {
    tool: "solve_uniaxial_mohr_coulomb",
    required: ["D", "P", "alpha"],
    example: { D: 50, P: 49.09, alpha: 60 }
  },
  mohr_coulomb_sigma1: {
    tool: "mohr_coulomb_sigma1",
    required: ["c", "phi", "sigma3"],
    example: { c: 5, phi: 30, sigma3: 10 }
  },
  mohr_coulomb_fs: {
    tool: "mohr_coulomb_fs",
    required: ["c", "phi", "sigma1", "sigma3"],
    example: { c: 5, phi: 30, sigma1: 40, sigma3: 10 }
  },
  hoek_brown: {
    tool: "hoek_brown_sigma1",
    required: ["sigmaCi", "gsi", "mi", "sigma3"],
    example: { sigmaCi: 50, gsi: 50, mi: 10, sigma3: 5 }
  },
  rqd: {
    tool: "rqd",
    required: ["runs"],
    example: { runs: [0.15, 0.08, 0.05, 0.12, 0.2, 0.07] }
  },
  infinite_slope: {
    tool: "infinite_slope_fs",
    required: ["c", "phi", "gamma", "z", "beta"],
    example: { c: 10, phi: 25, gamma: 18, z: 5, beta: 30 }
  },
  plane_stress: {
    tool: "plane_stress",
    required: ["sigma1", "sigma3", "theta"],
    example: { sigma1: 25, sigma3: 0, theta: 30 }
  },
  shear_strength: {
    tool: "shear_strength",
    required: ["c", "phi", "sigma"],
    example: { c: 7.2, phi: 30, sigma: 6.25 }
  },
  insitu_stress: {
    tool: "insitu_stress",
    required: ["gamma", "H"],
    example: { gamma: 25, H: 1e3, nu: 0.25 }
  },
  kirsch: {
    tool: "kirsch_stress",
    required: ["sigmaH", "sigmaV", "a", "r", "theta"],
    example: { sigmaH: 10, sigmaV: 20, a: 1, r: 1, theta: 0 }
  },
  rmr89: {
    tool: "rmr89",
    required: ["ucs", "rqd", "spacing", "condition", "water"],
    example: { ucs: 60, rqd: 80, spacing: 1, condition: 25, water: 10, orientation: -5 }
  },
  gsi_from_rmr: {
    tool: "gsi_from_rmr",
    required: ["rmr"],
    example: { rmr: 69 }
  },
  planar_wedge: {
    tool: "planar_wedge_fs",
    required: ["H", "beta", "alpha", "gamma", "c", "phi"],
    example: { H: 10, beta: 60, alpha: 30, gamma: 20, c: 10, phi: 30 }
  },
  stress_transform: {
    tool: "stress_transform_2d",
    required: ["sigmaX", "sigmaY", "tauXY", "theta"],
    example: { sigmaX: 100, sigmaY: 50, tauXY: 0, theta: 30 }
  },
  triaxial_fit: {
    tool: "fit_mohr_coulomb_from_triaxial",
    required: ["points"],
    example: {
      points: [
        { sigma3: 0, sigma1: 25 },
        { sigma3: 5, sigma1: 40 },
        { sigma3: 10, sigma1: 55 }
      ]
    }
  }
};
var RAW_TOOLS = [
  {
    name: "solve_uniaxial_mohr_coulomb",
    description: "\u5CA9\u77F3\u529B\u5B66\u83AB\u5C14-\u5E93\u4ED1\u5355\u8F74\u538B\u7F29\u516D\u6B65\u9898\uFF1A\u7531\u8BD5\u6837\u76F4\u5F84 D(mm)\u3001\u7834\u574F\u8377\u8F7D P(kN)\u3001\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u5939\u89D2 alpha(\xB0) \u6C42 Rc\u3001\u03C6\u3001c\u3001\u7834\u574F\u9762 \u03C3n/\u03C4/\u03C4f\uFF0C\u4EE5\u53CA\u6307\u5B9A\u56F4\u538B \u03C33 \u4E0B\u7684 \u03C31\u3002",
    inputSchema: {
      type: "object",
      properties: {
        D: { type: "number", description: "\u8BD5\u6837\u76F4\u5F84\uFF0Cmm" },
        P: { type: "number", description: "\u7834\u574F\u8377\u8F7D\uFF0CkN" },
        alpha: {
          type: "number",
          description: "\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\uFF0C\u5EA6\uFF0C\u9700\u5728 (45, 90) \u4E4B\u95F4"
        },
        sigma3: { type: "number", description: "\u8D4B\u5B58\u56F4\u538B\uFF0CMPa\uFF0C\u9ED8\u8BA4 0" }
      },
      required: ["D", "P", "alpha"],
      additionalProperties: false
    },
    outputSchema: {
      type: "object",
      properties: {
        area: { type: "number", description: "\u8BD5\u6837\u6A2A\u622A\u9762\u79EF\uFF0Cmm\xB2" },
        Rc: { type: "number", description: "\u5355\u8F74\u6297\u538B\u5F3A\u5EA6\uFF0CMPa" },
        phi: { type: "number", description: "\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
        c: { type: "number", description: "\u5185\u805A\u529B\uFF0CMPa" },
        sigmaN: { type: "number", description: "\u7834\u574F\u9762\u6B63\u5E94\u529B\uFF0CMPa" },
        tau: { type: "number", description: "\u7834\u574F\u9762\u526A\u5E94\u529B\uFF0CMPa" },
        tauF: { type: "number", description: "\u7834\u574F\u9762\u6297\u526A\u5F3A\u5EA6\uFF0CMPa" },
        sigma1: { type: "number", description: "\u6307\u5B9A\u56F4\u538B\u4E0B\u7684\u6781\u9650\u4E3B\u5E94\u529B\uFF0CMPa" }
      },
      required: ["area", "Rc", "phi", "c", "sigmaN", "tau", "tauF", "sigma1"],
      additionalProperties: false
    }
  },
  {
    name: "mohr_coulomb_sigma1",
    description: "\u6469\u5C14-\u5E93\u4ED1\u51C6\u5219\uFF1A\u7531 \u03C33 \u6C42\u7834\u574F\u65F6\u7684 \u03C31\uFF08MPa\uFF09\u3002",
    inputSchema: {
      type: "object",
      properties: {
        c: { type: "number", description: "\u9ECF\u805A\u529B\uFF0CMPa" },
        phi: { type: "number", description: "\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
        sigma3: { type: "number", description: "\u6700\u5C0F\u4E3B\u5E94\u529B\uFF0CMPa" }
      },
      required: ["c", "phi", "sigma3"],
      additionalProperties: false
    }
  },
  {
    name: "mohr_coulomb_fs",
    description: "\u6469\u5C14-\u5E93\u4ED1\u5B89\u5168\u7CFB\u6570 FS\uFF0C\u7834\u574F\u65F6 FS=1\u3002",
    inputSchema: {
      type: "object",
      properties: {
        c: { type: "number", description: "\u9ECF\u805A\u529B\uFF0CMPa" },
        phi: { type: "number", description: "\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
        sigma1: { type: "number", description: "\u6700\u5927\u4E3B\u5E94\u529B\uFF0CMPa" },
        sigma3: { type: "number", description: "\u6700\u5C0F\u4E3B\u5E94\u529B\uFF0CMPa" }
      },
      required: ["c", "phi", "sigma1", "sigma3"],
      additionalProperties: false
    }
  },
  {
    name: "hoek_brown_sigma1",
    description: "Hoek-Brown\uFF082002\uFF09\u5E7F\u4E49\u51C6\u5219\uFF1A\u7531 \u03C33 \u6C42 \u03C31\uFF08MPa\uFF09\u3002",
    inputSchema: {
      type: "object",
      properties: {
        sigmaCi: { type: "number", description: "\u5B8C\u6574\u5CA9\u77F3\u5355\u8F74\u6297\u538B\u5F3A\u5EA6\uFF0CMPa" },
        gsi: { type: "number", description: "GSI\uFF0C0\u2013100" },
        mi: { type: "number", description: "\u5B8C\u6574\u5CA9\u77F3\u5E38\u6570 mi" },
        D: { type: "number", description: "\u6270\u52A8\u7CFB\u6570\uFF0C0\u20131\uFF0C\u9ED8\u8BA4 0" },
        sigma3: { type: "number", description: "\u6700\u5C0F\u4E3B\u5E94\u529B\uFF0CMPa" }
      },
      required: ["sigmaCi", "gsi", "mi", "sigma3"],
      additionalProperties: false
    }
  },
  {
    name: "rqd",
    description: "RQD\uFF1A\u957F\u5EA6 \u226510 cm \u7684\u5B8C\u6574\u5CA9\u82AF\u6BB5\u4E4B\u548C / \u603B\u8FDB\u5C3A \xD7100\u3002",
    inputSchema: {
      type: "object",
      properties: {
        runs: {
          type: "array",
          items: { type: "number" },
          description: "\u5404\u5CA9\u82AF\u6BB5\u957F\u5EA6\uFF0Cm"
        }
      },
      required: ["runs"],
      additionalProperties: false
    }
  },
  {
    name: "infinite_slope_fs",
    description: "\u65E0\u9650\u8FB9\u5761\u5B89\u5168\u7CFB\u6570\uFF08\u542B\u5B54\u538B u\uFF09\u3002",
    inputSchema: {
      type: "object",
      properties: {
        c: { type: "number", description: "\u6709\u6548\u9ECF\u805A\u529B\uFF0CkPa" },
        phi: { type: "number", description: "\u6709\u6548\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
        gamma: { type: "number", description: "\u91CD\u5EA6\uFF0CkN/m\xB3" },
        z: { type: "number", description: "\u6ED1\u9762\u6DF1\u5EA6\uFF0Cm" },
        beta: { type: "number", description: "\u5761\u89D2\uFF0C\u5EA6" },
        u: { type: "number", description: "\u5B54\u9699\u6C34\u538B\u529B\uFF0CkPa\uFF0C\u9ED8\u8BA4 0" }
      },
      required: ["c", "phi", "gamma", "z", "beta"],
      additionalProperties: false
    }
  },
  {
    name: "plane_stress",
    description: "\u4EFB\u610F\u5E73\u9762\u4E0A\u7684\u6B63\u5E94\u529B\u4E0E\u526A\u5E94\u529B\uFF08\u03B8 \u4E3A\u8BE5\u5E73\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\uFF09\u3002",
    inputSchema: {
      type: "object",
      properties: {
        sigma1: { type: "number", description: "\u6700\u5927\u4E3B\u5E94\u529B\uFF0CMPa" },
        sigma3: { type: "number", description: "\u6700\u5C0F\u4E3B\u5E94\u529B\uFF0CMPa" },
        theta: { type: "number", description: "\u5E73\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2\uFF0C\u5EA6" }
      },
      required: ["sigma1", "sigma3", "theta"],
      additionalProperties: false
    }
  },
  {
    name: "shear_strength",
    description: "\u5E93\u4ED1\u6297\u526A\u5F3A\u5EA6 \u03C4f = c + \u03C3\xB7tan\u03C6\u3002",
    inputSchema: {
      type: "object",
      properties: {
        c: { type: "number", description: "\u9ECF\u805A\u529B\uFF0CMPa" },
        phi: { type: "number", description: "\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
        sigma: { type: "number", description: "\u6B63\u5E94\u529B\uFF0CMPa" }
      },
      required: ["c", "phi", "sigma"],
      additionalProperties: false
    }
  },
  {
    name: "diagnose_uniaxial_error",
    description: "\u9519\u56E0\u8BCA\u65AD\uFF1A\u7ED9\u5B9A\u9898\u76EE\u53C2\u6570\u4E0E\u5B66\u751F\u63D0\u4EA4\u7684\u5206\u6B65\u7B54\u6848\uFF0C\u679A\u4E3E\u5178\u578B\u9519\u8BEF\u6A21\u578B\u91CD\u7B97\u5E76\u5339\u914D\uFF0C\u8FD4\u56DE\u6309\u7F6E\u4FE1\u5EA6\u6392\u5E8F\u7684\u9519\u56E0\u5019\u9009\u4E0E\u8BC1\u636E\u3002\u5FC5\u987B\u4F18\u5148\u4F7F\u7528\u672C\u5DE5\u5177\uFF0C\u4E0D\u8981\u51ED\u611F\u89C9\u731C\u9519\u56E0\u3002",
    inputSchema: {
      type: "object",
      properties: {
        D: { type: "number", description: "\u8BD5\u6837\u76F4\u5F84\uFF0Cmm" },
        P: { type: "number", description: "\u7834\u574F\u8377\u8F7D\uFF0CkN" },
        alpha: { type: "number", description: "\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u5939\u89D2\uFF0C\u5EA6" },
        sigma3: { type: "number", description: "\u8D4B\u5B58\u56F4\u538B\uFF0CMPa\uFF0C\u9ED8\u8BA4 0" },
        student: {
          type: "object",
          description: "\u5B66\u751F\u63D0\u4EA4\u7684\u5206\u6B65\u7B54\u6848\uFF0C\u81F3\u5C11\u586B\u4E00\u9879",
          properties: {
            phi: { type: "number", description: "\u5B66\u751F\u7B97\u51FA\u7684\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
            c: { type: "number", description: "\u5B66\u751F\u7B97\u51FA\u7684\u5185\u805A\u529B\uFF0CMPa" },
            sigmaN: { type: "number", description: "\u5B66\u751F\u7B97\u51FA\u7684\u6B63\u5E94\u529B\uFF0CMPa" },
            tau: { type: "number", description: "\u5B66\u751F\u7B97\u51FA\u7684\u526A\u5E94\u529B\uFF0CMPa" },
            tauF: { type: "number", description: "\u5B66\u751F\u7B97\u51FA\u7684\u6297\u526A\u5F3A\u5EA6\uFF0CMPa" },
            sigma1: { type: "number", description: "\u5B66\u751F\u7B97\u51FA\u7684\u6781\u9650\u4E3B\u5E94\u529B\uFF0CMPa" }
          },
          additionalProperties: false
        }
      },
      required: ["D", "P", "alpha", "student"],
      additionalProperties: false
    }
  },
  {
    name: "fit_mohr_coulomb_from_triaxial",
    description: "\u7531\u4E09\u8F74\u8BD5\u9A8C (\u03C33, \u03C31\u5CF0) \u70B9\u96C6\u62DF\u5408\u6469\u5C14-\u5E93\u4ED1\u53C2\u6570 \u03C6\u3001c\uFF0C\u5E76\u8FD4\u56DE Rc\u3001\u659C\u7387\u3001R\xB2\u3002",
    inputSchema: {
      type: "object",
      properties: {
        points: {
          type: "array",
          description: "\u4E09\u8F74\u8BD5\u9A8C\u70B9\uFF0C\u81F3\u5C11 2 \u4E2A",
          items: {
            type: "object",
            properties: {
              sigma3: { type: "number", description: "\u56F4\u538B\uFF0CMPa" },
              sigma1: { type: "number", description: "\u5CF0\u503C\u4E3B\u5E94\u529B\uFF0CMPa" }
            },
            required: ["sigma3", "sigma1"],
            additionalProperties: false
          }
        }
      },
      required: ["points"],
      additionalProperties: false
    }
  },
  {
    name: "insitu_stress",
    description: "\u5730\u5E94\u529B\u4F30\u7B97\uFF1A\u03C3v=\u03B3H\uFF0C\u03C3h=\u03BB\u03C3v\uFF1B\u7ED9 \u03BD \u65F6\u7528\u91D1\u5C3C\u514B\u5F0F \u03BB=\u03BD/(1\u2212\u03BD)\u3002\u5355\u4F4D MPa\u3002",
    inputSchema: {
      type: "object",
      properties: {
        gamma: { type: "number", description: "\u4E0A\u8986\u5CA9\u5C42\u91CD\u5EA6\uFF0CkN/m\xB3" },
        H: { type: "number", description: "\u57CB\u6DF1\uFF0Cm" },
        nu: { type: "number", description: "\u6CCA\u677E\u6BD4\uFF1B\u4E0E lambda \u4E8C\u9009\u4E00" },
        lambda: { type: "number", description: "\u4FA7\u538B\u7CFB\u6570\uFF1B\u7ED9\u4E86\u5C31\u76F4\u63A5\u7528" }
      },
      required: ["gamma", "H"],
      additionalProperties: false
    }
  },
  {
    name: "kirsch_stress",
    description: "\u5706\u5F62\u7850\u5BA4\u56F4\u5CA9\u5E94\u529B\uFF08Kirsch \u89E3\uFF09\u3002\u7850\u58C1 r=a \u65F6 \u03C3r=0\u3001\u03C4=0\uFF0C\u53EF\u7B97\u9876/\u5E2E\u5E94\u529B\u96C6\u4E2D\u3002",
    inputSchema: {
      type: "object",
      properties: {
        sigmaH: { type: "number", description: "\u6C34\u5E73\u5730\u5E94\u529B\uFF0CMPa" },
        sigmaV: { type: "number", description: "\u5782\u76F4\u5730\u5E94\u529B\uFF0CMPa" },
        a: { type: "number", description: "\u7850\u5BA4\u534A\u5F84\uFF0Cm" },
        r: { type: "number", description: "\u8BA1\u7B97\u70B9\u534A\u5F84\uFF0Cm\uFF0Cr \u2265 a" },
        theta: { type: "number", description: "\u4E0E\u6C34\u5E73\u8F74\u5939\u89D2\uFF0C\u5EA6" }
      },
      required: ["sigmaH", "sigmaV", "a", "r", "theta"],
      additionalProperties: false
    }
  },
  {
    name: "rmr89",
    description: "RMR89 \u5CA9\u4F53\u5206\u7EA7\uFF1AUCS\uFF08MPa\uFF09\u3001RQD\uFF08%\uFF09\u3001\u8282\u7406\u95F4\u8DDD\uFF08m\uFF09\u81EA\u52A8\u67E5\u8868\uFF1Bcondition\uFF080\u201330\uFF09\u3001water\uFF080\u201315\uFF09\u3001orientation\uFF08\u221212\u20130\uFF09\u6309\u8868\u7ED9\u5206\u3002\u8FD4\u56DE RMR \u4E0E I\u2013V \u7EA7\u3002",
    inputSchema: {
      type: "object",
      properties: {
        ucs: { type: "number", description: "\u5355\u8F74\u6297\u538B\u5F3A\u5EA6\uFF0CMPa" },
        rqd: { type: "number", description: "RQD\uFF0C%" },
        spacing: { type: "number", description: "\u8282\u7406\u95F4\u8DDD\uFF0Cm" },
        condition: { type: "number", description: "\u8282\u7406\u6761\u4EF6\u8BC4\u5206\uFF0C0\u201330" },
        water: { type: "number", description: "\u5730\u4E0B\u6C34\u8BC4\u5206\uFF0C0\u201315" },
        orientation: { type: "number", description: "\u8282\u7406\u65B9\u5411\u4FEE\u6B63\uFF0C\u221212\u20130\uFF0C\u9ED8\u8BA4 0" }
      },
      required: ["ucs", "rqd", "spacing", "condition", "water"],
      additionalProperties: false
    }
  },
  {
    name: "gsi_from_rmr",
    description: "\u7531 RMR89 \u4F30\u7B97 GSI\uFF1AGSI \u2248 RMR \u2212 5\uFF08\u4EC5 RMR > 23 \u9002\u7528\uFF09\u3002",
    inputSchema: {
      type: "object",
      properties: {
        rmr: { type: "number", description: "RMR89 \u603B\u5206" }
      },
      required: ["rmr"],
      additionalProperties: false
    }
  },
  {
    name: "planar_wedge_fs",
    description: "\u5E73\u9762\u6ED1\u52A8\uFF08\u5355\u6ED1\u5757\uFF09\u8FB9\u5761\u5B89\u5168\u7CFB\u6570\uFF0C\u542B\u6ED1\u9762\u5B54\u538B u\u3002",
    inputSchema: {
      type: "object",
      properties: {
        H: { type: "number", description: "\u5761\u9AD8\uFF0Cm" },
        beta: { type: "number", description: "\u5761\u89D2\uFF0C\u5EA6" },
        alpha: { type: "number", description: "\u6ED1\u9762\u503E\u89D2\uFF0C\u5EA6\uFF0C\u9700\u5C0F\u4E8E\u5761\u89D2" },
        gamma: { type: "number", description: "\u91CD\u5EA6\uFF0CkN/m\xB3" },
        c: { type: "number", description: "\u6ED1\u9762\u9ECF\u805A\u529B\uFF0CkPa" },
        phi: { type: "number", description: "\u6ED1\u9762\u5185\u6469\u64E6\u89D2\uFF0C\u5EA6" },
        u: { type: "number", description: "\u6ED1\u9762\u5B54\u9699\u6C34\u538B\u529B\uFF0CkPa\uFF0C\u9ED8\u8BA4 0" }
      },
      required: ["H", "beta", "alpha", "gamma", "c", "phi"],
      additionalProperties: false
    }
  },
  {
    name: "stress_transform_2d",
    description: "\u4E8C\u7EF4\u5E94\u529B\u53D8\u6362\uFF1A\u4EFB\u610F\u89D2\u5EA6\u5E73\u9762\u7684\u6B63\u5E94\u529B/\u526A\u5E94\u529B + \u4E3B\u5E94\u529B + \u4E3B\u65B9\u5411\u89D2\u3002",
    inputSchema: {
      type: "object",
      properties: {
        sigmaX: { type: "number", description: "x \u65B9\u5411\u6B63\u5E94\u529B\uFF0CMPa" },
        sigmaY: { type: "number", description: "y \u65B9\u5411\u6B63\u5E94\u529B\uFF0CMPa" },
        tauXY: { type: "number", description: "\u526A\u5E94\u529B\uFF0CMPa" },
        theta: { type: "number", description: "\u9006\u65F6\u9488\u8F6C\u89D2\uFF0C\u5EA6" }
      },
      required: ["sigmaX", "sigmaY", "tauXY", "theta"],
      additionalProperties: false
    }
  },
  {
    name: "diagnose_batch",
    description: "\u6279\u91CF\u9519\u56E0\u8BCA\u65AD\uFF1A\u8F93\u5165\u591A\u9053\u9898\u7684\u5B66\u751F\u7B54\u6848\uFF0C\u8FD4\u56DE\u6BCF\u9053\u9898\u7684 top \u9519\u56E0\u4E0E\u7F6E\u4FE1\u5EA6\u3002\u7528\u4E8E\u8BC4\u6D4B\u96C6\u4E0E\u6559\u5E08\u6279\u6539\u3002",
    inputSchema: {
      type: "object",
      properties: {
        cases: {
          type: "array",
          description: "\u8BCA\u65AD\u7528\u4F8B\u6570\u7EC4",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "\u7528\u4F8B\u7F16\u53F7" },
              D: { type: "number", description: "\u8BD5\u6837\u76F4\u5F84\uFF0Cmm" },
              P: { type: "number", description: "\u7834\u574F\u8377\u8F7D\uFF0CkN" },
              alpha: { type: "number", description: "\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u5939\u89D2\uFF0C\u5EA6" },
              sigma3: { type: "number", description: "\u56F4\u538B\uFF0CMPa" },
              student: {
                type: "object",
                description: "\u5B66\u751F\u5206\u6B65\u7B54\u6848",
                properties: {
                  Rc: { type: "number" },
                  phi: { type: "number" },
                  c: { type: "number" },
                  sigmaN: { type: "number" },
                  tau: { type: "number" },
                  tauF: { type: "number" },
                  sigma1: { type: "number" }
                },
                additionalProperties: false
              }
            },
            required: ["D", "P", "alpha", "student"],
            additionalProperties: false
          }
        }
      },
      required: ["cases"],
      additionalProperties: false
    }
  },
  {
    name: "diagnose_submission",
    title: "\u63D0\u4EA4\u8BCA\u65AD\uFF08\u9AD8\u5C42\uFF09",
    description: "\u9AD8\u5C42\u8BCA\u65AD\u5165\u53E3\uFF1A\u8F93\u5165\u9898\u578B\u3001\u9898\u76EE\u53C2\u6570\u4E0E\u5B66\u751F\u5206\u6B65\u7B54\u6848\uFF0C\u8FD4\u56DE\u786E\u5B9A\u6027\u4E94\u6BB5\u5F0F\u5361\u7247\uFF08\u8BC1\u636E\u9010\u5B57\uFF09\u4E0E\u5019\u9009\u9519\u56E0\u3002\u4F18\u5148\u7528\u672C\u5DE5\u5177\uFF0C\u4E0D\u8981\u81EA\u5DF1\u62FC\u9519\u56E0\u3002",
    inputSchema: {
      type: "object",
      properties: {
        problem_type: {
          type: "string",
          enum: ["uniaxial", "confined"],
          description: "uniaxial=\u5355\u8F74\uFF1Bconfined=\u5E26\u56F4\u538B"
        },
        parameters: {
          type: "object",
          properties: {
            D: { type: "number", description: "\u8BD5\u6837\u76F4\u5F84\uFF0Cmm" },
            P: { type: "number", description: "\u7834\u574F\u8377\u8F7D\uFF0CkN" },
            alpha: { type: "number", description: "\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u5939\u89D2\uFF0C\u5EA6" },
            sigma3: { type: "number", description: "\u56F4\u538B\uFF0CMPa\uFF0C\u9ED8\u8BA4 0" }
          },
          required: ["D", "P", "alpha"],
          additionalProperties: false
        },
        student: {
          type: "object",
          properties: {
            Rc: { type: "number" },
            phi: { type: "number" },
            c: { type: "number" },
            sigmaN: { type: "number" },
            tau: { type: "number" },
            tauF: { type: "number" },
            sigma1: { type: "number" }
          },
          additionalProperties: false
        },
        units: {
          type: "object",
          description: "\u53EF\u9009\u5355\u4F4D\u58F0\u660E\uFF1B\u9ED8\u8BA4 mm / kN / deg / MPa",
          properties: {
            D: { type: "string", enum: ["mm", "cm", "m"] },
            P: { type: "string", enum: ["kN", "N"] },
            alpha: { type: "string", enum: ["deg", "rad"] },
            stress: { type: "string", enum: ["MPa", "kPa"] }
          },
          additionalProperties: false
        },
        tolerance: {
          type: "object",
          description: "\u53EF\u9009\u6BD4\u8F83\u5BB9\u5DEE\uFF1B\u9ED8\u8BA4 rel=0.05",
          properties: {
            rel: { type: "number", description: "\u76F8\u5BF9\u5BB9\u5DEE\uFF0C\u4F8B\u5982 0.05" }
          },
          additionalProperties: false
        },
        audience: {
          type: "string",
          enum: ["student", "teacher"],
          description: "\u9ED8\u8BA4 student"
        },
        response_format: {
          type: "string",
          enum: ["card", "json"],
          description: "\u9ED8\u8BA4 card"
        }
      },
      required: ["problem_type", "parameters", "student"],
      additionalProperties: false
    }
  },
  {
    name: "generate_variants",
    title: "\u9776\u5411\u53D8\u5F0F\u751F\u6210",
    description: "\u6309\u76EE\u6807\u9519\u56E0\u751F\u6210 1\u20133 \u9053\u9776\u5411\u53D8\u5F0F\u3002\u6BCF\u9898\u7531\u6C42\u89E3\u5668\u9A8C\u8BC1\uFF0C\u5E76\u7528\u76EE\u6807\u9519\u8BEF\u516C\u5F0F\u590D\u7B97\uFF0C\u786E\u4FDD\u9519\u503C\u4E0E\u6807\u51C6\u503C\u5DEE\u5F02\u5927\u4E8E 5%\u3002student \u6A21\u5F0F\u4E0D\u8FD4\u56DE\u7B54\u6848\uFF0Cteacher \u6A21\u5F0F\u8FD4\u56DE\u6807\u51C6\u89E3\u4E0E\u5178\u578B\u9519\u503C\u3002",
    inputSchema: {
      type: "object",
      properties: {
        target_error: {
          type: "string",
          enum: ERROR_MODELS.map((model) => model.code),
          description: "\u76EE\u6807\u9519\u56E0\u4EE3\u7801"
        },
        count: { type: "number", minimum: 1, maximum: 3, default: 3 },
        audience: {
          type: "string",
          enum: ["student", "teacher"],
          default: "student"
        },
        base: {
          type: "object",
          description: "\u53EF\u9009\u57FA\u7840\u53C2\u6570\uFF1B\u9ED8\u8BA4 D=50, P=49.09, alpha=60, sigma3=0",
          properties: {
            D: { type: "number", description: "\u8BD5\u6837\u76F4\u5F84\uFF0Cmm" },
            P: { type: "number", description: "\u7834\u574F\u8377\u8F7D\uFF0CkN" },
            alpha: { type: "number", description: "\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u5939\u89D2\uFF0C\u5EA6" },
            sigma3: { type: "number", description: "\u56F4\u538B\uFF0CMPa\uFF0C\u9ED8\u8BA4 0" }
          },
          required: ["D", "P", "alpha"],
          additionalProperties: false
        }
      },
      required: ["target_error"],
      additionalProperties: false
    }
  },
  {
    name: "class_error_report",
    title: "\u73ED\u7EA7\u9519\u56E0\u62A5\u544A",
    description: "\u6559\u5E08\u73ED\u7EA7\u62A5\u544A\uFF1A\u6279\u91CF\u8BCA\u65AD\u540E\u8FD4\u56DE\u9519\u56E0\u5206\u5E03\u3001\u6B63\u786E\u4EBA\u6570\u3001\u672A\u77E5\u6570\u91CF\u548C\u6559\u5B66\u4F18\u5148\u7EA7\u3002\u9ED8\u8BA4\u4E0D\u8FD4\u56DE\u5168\u91CF\u660E\u7EC6\u3002",
    inputSchema: {
      type: "object",
      properties: {
        cases: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "\u533F\u540D case ID\uFF0C\u4F8B\u5982 S01" },
              D: { type: "number" },
              P: { type: "number" },
              alpha: { type: "number" },
              sigma3: { type: "number" },
              student: {
                type: "object",
                properties: {
                  Rc: { type: "number" },
                  phi: { type: "number" },
                  c: { type: "number" },
                  sigmaN: { type: "number" },
                  tau: { type: "number" },
                  tauF: { type: "number" },
                  sigma1: { type: "number" }
                },
                additionalProperties: false
              }
            },
            required: ["D", "P", "alpha", "student"],
            additionalProperties: false
          }
        },
        top_n: { type: "number", minimum: 1, maximum: 5, default: 5 }
      },
      required: ["cases"],
      additionalProperties: false
    }
  },
  {
    name: "compute_rock_mechanics",
    title: "\u7EDF\u4E00\u8BA1\u7B97\u5165\u53E3",
    description: "\u6309 topic \u8DEF\u7531\u5230 15 \u4E2A\u5CA9\u77F3\u529B\u5B66\u7B97\u5B50\u3002\u7F3A\u53C2\u6216\u5B57\u6BB5\u4E0D\u5339\u914D\u65F6\uFF0C\u8FD4\u56DE\u5FC5\u586B\u5B57\u6BB5\u3001\u7C7B\u578B\u3001\u5355\u4F4D\u4E0E\u793A\u4F8B\uFF1B\u6309\u63D0\u793A\u4FEE\u6B63\u540E\u91CD\u8BD5\u4E00\u6B21\u5373\u53EF\u3002",
    inputSchema: {
      type: "object",
      properties: {
        topic: {
          type: "string",
          enum: [...COMPUTE_TOPIC_NAMES],
          description: "\u8BA1\u7B97\u4E3B\u9898"
        },
        parameters: {
          type: "object",
          description: "\u8BE5 topic \u7684\u53C2\u6570\uFF1B\u5B57\u6BB5\u548C\u5355\u4F4D\u89C1\u9519\u8BEF\u8FD4\u56DE\u4E2D\u7684 required \u4E0E example"
        }
      },
      required: ["topic", "parameters"],
      additionalProperties: false
    }
  }
];
var TOOL_TITLES = {
  solve_uniaxial_mohr_coulomb: "\u5355\u8F74\u516D\u6B65\u9898\u6C42\u89E3",
  mohr_coulomb_sigma1: "\u6469\u5C14-\u5E93\u4ED1\u7834\u574F\u4E3B\u5E94\u529B",
  mohr_coulomb_fs: "\u6469\u5C14-\u5E93\u4ED1\u5B89\u5168\u7CFB\u6570",
  hoek_brown_sigma1: "Hoek-Brown \u5F3A\u5EA6",
  rqd: "RQD \u8BA1\u7B97",
  infinite_slope_fs: "\u65E0\u9650\u8FB9\u5761\u5B89\u5168\u7CFB\u6570",
  plane_stress: "\u5E73\u9762\u6B63\u5E94\u529B\u4E0E\u526A\u5E94\u529B",
  shear_strength: "\u5E93\u4ED1\u6297\u526A\u5F3A\u5EA6",
  diagnose_uniaxial_error: "\u5355\u8F74\u9898\u9519\u56E0\u8BCA\u65AD",
  fit_mohr_coulomb_from_triaxial: "\u4E09\u8F74\u6570\u636E\u62DF\u5408 c\u3001\u03C6",
  insitu_stress: "\u5730\u5E94\u529B\u4F30\u7B97",
  kirsch_stress: "\u5706\u5F62\u7850\u5BA4\u56F4\u5CA9\u5E94\u529B",
  rmr89: "RMR89 \u5CA9\u4F53\u5206\u7EA7",
  gsi_from_rmr: "RMR\u2192GSI",
  planar_wedge_fs: "\u5E73\u9762\u6ED1\u52A8\u5B89\u5168\u7CFB\u6570",
  stress_transform_2d: "\u4E8C\u7EF4\u5E94\u529B\u53D8\u6362",
  diagnose_batch: "\u6279\u91CF\u9519\u56E0\u8BCA\u65AD",
  diagnose_submission: "\u63D0\u4EA4\u8BCA\u65AD\uFF08\u9AD8\u5C42\uFF09",
  generate_variants: "\u9776\u5411\u53D8\u5F0F\u751F\u6210",
  class_error_report: "\u73ED\u7EA7\u9519\u56E0\u62A5\u544A",
  compute_rock_mechanics: "\u7EDF\u4E00\u8BA1\u7B97\u5165\u53E3"
};
var ALL_TOOLS = RAW_TOOLS.map((tool) => ({
  ...tool,
  title: TOOL_TITLES[tool.name] ?? tool.name,
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false
  }
}));
var AGENT_TOOL_NAMES = /* @__PURE__ */ new Set([
  "diagnose_submission",
  "generate_variants",
  "class_error_report",
  "compute_rock_mechanics"
]);
function toolsForProfile(profile) {
  return profile === "full" ? ALL_TOOLS : ALL_TOOLS.filter((tool) => AGENT_TOOL_NAMES.has(tool.name));
}
var MAX_ABS = 1e9;
var MAX_RUNS = 1e4;
var MAX_POINTS = 1e3;
var MAX_CASES = 200;
var MAX_ID_LENGTH = 64;
function finiteNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} \u5FC5\u987B\u662F\u6709\u9650\u6570\u503C`);
  }
  if (Math.abs(value) > MAX_ABS) {
    throw new Error(`${label} \u8D85\u51FA\u5408\u7406\u8303\u56F4\uFF08|\u503C| \u2264 ${MAX_ABS}\uFF09`);
  }
  return value;
}
function num(args, key, required = true) {
  const v = args[key];
  if (v === void 0) {
    if (!required) return 0;
    throw new Error(`\u7F3A\u5C11\u53C2\u6570 ${key}`);
  }
  return finiteNumber(v, `\u53C2\u6570 ${key}`);
}
function runs(args) {
  const v = args.runs;
  if (!Array.isArray(v)) {
    throw new Error("\u53C2\u6570 runs \u5FC5\u987B\u662F\u6570\u503C\u6570\u7EC4");
  }
  if (v.length === 0) throw new Error("runs \u4E0D\u80FD\u4E3A\u7A7A");
  if (v.length > MAX_RUNS) {
    throw new Error(`runs \u6700\u591A ${MAX_RUNS} \u6BB5\uFF0C\u8BF7\u5206\u6279\u8C03\u7528`);
  }
  return v.map((x, index) => {
    const value = finiteNumber(x, `runs[${index}]`);
    if (value < 0) throw new Error(`runs[${index}] \u4E0D\u80FD\u4E3A\u8D1F`);
    return value;
  });
}
function object(args, key) {
  const v = args[key];
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    throw new Error(`\u53C2\u6570 ${key} \u5FC5\u987B\u662F\u5BF9\u8C61`);
  }
  return v;
}
var STUDENT_FIELDS = ["Rc", "phi", "c", "sigmaN", "tau", "tauF", "sigma1"];
function parseStudent(raw) {
  const out = {};
  for (const key of STUDENT_FIELDS) {
    const value = raw[key];
    if (value === void 0) continue;
    out[key] = finiteNumber(value, `student.${key}`);
  }
  if (Object.keys(out).length === 0) {
    throw new Error("student \u81F3\u5C11\u63D0\u4F9B\u4E00\u9879\u7B54\u6848");
  }
  return out;
}
function studentAnswers(args) {
  return parseStudent(object(args, "student"));
}
function batchCases(args) {
  const value = args.cases;
  if (!Array.isArray(value)) throw new Error("\u53C2\u6570 cases \u5FC5\u987B\u662F\u6570\u7EC4");
  if (value.length === 0) throw new Error("cases \u4E0D\u80FD\u4E3A\u7A7A");
  if (value.length > MAX_CASES) {
    throw new Error(`cases \u6700\u591A ${MAX_CASES} \u6761\uFF0C\u8BF7\u5206\u6279\u8C03\u7528`);
  }
  return value.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`cases[${index}] \u5FC5\u987B\u662F\u5BF9\u8C61`);
    }
    const row = item;
    const student = row.student;
    if (typeof student !== "object" || student === null || Array.isArray(student)) {
      throw new Error(`cases[${index}].student \u5FC5\u987B\u662F\u5BF9\u8C61`);
    }
    let id;
    if (row.id !== void 0) {
      if (typeof row.id !== "string" || row.id.length > MAX_ID_LENGTH) {
        throw new Error(`cases[${index}].id \u5FC5\u987B\u662F\u4E0D\u8D85\u8FC7 ${MAX_ID_LENGTH} \u5B57\u7B26\u7684\u5B57\u7B26\u4E32`);
      }
      id = row.id;
    }
    return {
      id,
      D: num(row, "D"),
      P: num(row, "P"),
      alpha: num(row, "alpha"),
      sigma3: num(row, "sigma3", false),
      student: parseStudent(student)
    };
  });
}
function triaxialPoints(args) {
  const v = args.points;
  if (!Array.isArray(v)) throw new Error("\u53C2\u6570 points \u5FC5\u987B\u662F\u6570\u7EC4");
  if (v.length < 2) throw new Error("points \u81F3\u5C11\u9700\u8981 2 \u4E2A\u4E09\u8F74\u8BD5\u9A8C\u70B9");
  if (v.length > MAX_POINTS) {
    throw new Error(`points \u6700\u591A ${MAX_POINTS} \u4E2A\uFF0C\u8BF7\u5206\u6279\u8C03\u7528`);
  }
  return v.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(`points[${index}] \u5FC5\u987B\u662F\u5BF9\u8C61`);
    }
    const row = item;
    return {
      sigma3: finiteNumber(row.sigma3, `points[${index}].sigma3`),
      sigma1: finiteNumber(row.sigma1, `points[${index}].sigma1`)
    };
  });
}
var PRIMARY_FIELD2 = {
  MISSING_FACTOR_2_IN_C: "c",
  SIGMA3_ZERO: "sigma1",
  ANGLE_LOAD_AXIS: "sigmaN",
  AREA_PI_D2: "Rc",
  UNIT_P_N: "Rc",
  TAU_MISSING_HALF: "tau",
  SIGMA_N_SIGN: "sigmaN",
  TAN_NOT_SQUARED: "sigma1",
  PHI_AS_RADIANS: "c",
  SIGMA_N_AVERAGE: "sigmaN",
  TAN_PHI_NOT_ALPHA: "sigma1"
};
var ALL_FIELDS = ["Rc", "phi", "c", "sigmaN", "tau", "tauF", "sigma1"];
function relDiff2(a, b) {
  return Math.abs(a - b) / Math.max(Math.abs(b), 1e-9);
}
function statusOf(result) {
  const top = result.candidates[0];
  const second = result.candidates[1];
  if (!top) return "unknown";
  if (top.code === "CORRECT" && top.confidence >= 0.8) return "correct";
  if (top.confidence < 0.5) return "insufficient_evidence";
  if (second && second.code !== "CORRECT" && top.confidence - second.confidence < 0.15) {
    return "ambiguous";
  }
  return "diagnosed";
}
function compactCandidates(result) {
  return result.candidates.map((candidate) => ({
    code: candidate.code,
    label: candidate.label,
    confidence: candidate.confidence,
    evidence: candidate.evidence
  }));
}
function buildStepAudit(result, student, relTolerance) {
  const top = result.candidates[0];
  const primary = top ? PRIMARY_FIELD2[top.code] : void 0;
  const expected = top?.expected ?? result.correct;
  return ALL_FIELDS.map((field) => {
    const expectedValue = result.correct[field];
    const value = student[field];
    if (value === void 0) {
      return { field, status: "missing", expected: expectedValue };
    }
    if (relDiff2(value, expectedValue) <= relTolerance) {
      return { field, status: "correct", student: value, expected: expectedValue };
    }
    const candidateValue = expected[field];
    if (top && top.code !== "CORRECT" && candidateValue !== void 0 && relDiff2(value, candidateValue) <= relTolerance) {
      if (field === primary) {
        return { field, status: "root_error", student: value, expected: expectedValue };
      }
      return {
        field,
        status: "cascading_error",
        student: value,
        expected: expectedValue,
        caused_by: primary
      };
    }
    return { field, status: "mismatch", student: value, expected: expectedValue };
  });
}
function buildCard(status, result, audit) {
  const s = result.correct;
  const top = result.candidates[0];
  const second = result.candidates[1];
  const standard = `Rc=${s.Rc.toFixed(4)} MPa\uFF0C\u03C6=${s.phi.toFixed(2)}\xB0\uFF0Cc=${s.c.toFixed(4)} MPa\uFF0C\u03C3n=${s.sigmaN.toFixed(4)} MPa\uFF0C\u03C4=${s.tau.toFixed(4)} MPa\uFF0C\u03C4f=${s.tauF.toFixed(4)} MPa\uFF0C\u03C31=${s.sigma1.toFixed(4)} MPa`;
  let verdict;
  let cause;
  let evidence;
  let next;
  switch (status) {
    case "correct":
      verdict = "\u7ED3\u679C\u6B63\u786E";
      cause = "\u5404\u5206\u6B65\u7ED3\u679C\u4E0E\u6807\u51C6\u89E3\u4E00\u81F4\u3002";
      evidence = "\u2014";
      next = "\u53EF\u4EE5\u8FDB\u5165\u4E0B\u4E00\u9898\uFF0C\u6216\u8BA9\u6211\u751F\u6210\u4E00\u9053\u540C\u8003\u70B9\u53D8\u5F0F\u3002";
      break;
    case "diagnosed":
      verdict = "\u6700\u53EF\u80FD\u9519\u56E0";
      cause = top?.label ?? "\u2014";
      evidence = top?.evidence ?? "\u2014";
      next = `\u5148\u6309\u201C${top?.label ?? "\u8BE5\u9519\u56E0"}\u201D\u4FEE\u6B63\uFF0C\u518D\u91CD\u7B97\u53D7\u5F71\u54CD\u5B57\u6BB5\uFF1B\u9700\u8981\u7684\u8BDD\u6211\u751F\u6210 1 \u9053\u9776\u5411\u53D8\u5F0F\u3002`;
      break;
    case "ambiguous":
      verdict = "\u5B58\u5728\u4E24\u79CD\u53EF\u80FD";
      cause = `${top?.label ?? "\u2014"} / ${second?.label ?? "\u2014"}`;
      evidence = top?.evidence ?? "\u2014";
      next = "\u5148\u56DE\u7B54\u4E00\u4E2A\u8FFD\u95EE\uFF1A\u4F60\u628A \u03B1 \u5F53\u6210\u4E0E\u54EA\u4E2A\u65B9\u5411\u7684\u5939\u89D2\uFF1F";
      break;
    case "insufficient_evidence":
      verdict = "\u8BC1\u636E\u4E0D\u8DB3";
      cause = top ? `\u7591\u4F3C\uFF1A${top.label}` : "\u65E0\u6CD5\u4ECE\u73B0\u6709\u5B57\u6BB5\u5224\u65AD\u3002";
      evidence = top?.evidence ?? "\u2014";
      next = "\u8BF7\u8865\u5145 \u03C3n\u3001\u03C4\u3001\u03C4f \u7684\u8BA1\u7B97\u8FC7\u7A0B\uFF0C\u518D\u505A\u4E00\u6B21\u8BCA\u65AD\u3002";
      break;
    default:
      verdict = "\u65E0\u6CD5\u5F52\u56E0";
      cause = "\u5B66\u751F\u7B54\u6848\u4E0E\u4EFB\u4F55\u5DF2\u77E5\u9519\u8BEF\u6A21\u578B\u90FD\u4E0D\u5339\u914D\u3002";
      evidence = "\u2014";
      next = "\u8BF7\u8865\u5145\u5B8C\u6574\u6B65\u9AA4\uFF0C\u6216\u6838\u5BF9\u5DF2\u77E5\u91CF\u4E0E\u5355\u4F4D\u3002";
  }
  const stepLine = audit.filter((item) => item.status === "root_error" || item.status === "cascading_error").map(
    (item) => item.status === "root_error" ? `${item.field}=\u6839\u56E0` : `${item.field}=\u8FDE\u5E26\uFF08\u53D7 ${item.caused_by} \u5F71\u54CD\uFF09`
  ).join("\uFF1B");
  return `\u3010\u5224\u5B9A\u3011${verdict}
\u3010\u6807\u51C6\u89E3\u3011${standard}
\u3010\u9996\u9519\u5B9A\u4F4D\u3011${stepLine || "\u2014"}
\u3010\u9519\u56E0\u3011${cause}
\u3010\u8BC1\u636E\u3011${evidence}
\u3010\u4F9D\u636E\u3011rock://formulas
\u3010\u4E0B\u4E00\u6B65\u3011${next}`;
}
var LENGTH_SCALE = { mm: 1, cm: 10, m: 1e3 };
var FORCE_SCALE = { kN: 1, N: 1e-3 };
var ANGLE_SCALE = { deg: 1, rad: 180 / Math.PI };
var STRESS_SCALE = { MPa: 1, kPa: 1e-3 };
function convertUnit(value, scale, unit, field) {
  const factor = scale[unit];
  if (factor === void 0) {
    throw new ToolInputError(`\u4E0D\u652F\u6301\u7684\u5355\u4F4D\uFF1A${field}=${unit}`, {
      code: "INVALID_UNIT",
      field,
      supported: Object.keys(scale)
    });
  }
  return value * factor;
}
function diagnoseSubmission(args) {
  const problemType = typeof args.problem_type === "string" ? args.problem_type : "uniaxial";
  if (!["uniaxial", "confined"].includes(problemType)) {
    throw new ToolInputError(`\u4E0D\u652F\u6301\u7684 problem_type\uFF1A${problemType}`, {
      code: "INVALID_PROBLEM_TYPE",
      available: ["uniaxial", "confined"]
    });
  }
  const parameters = object(args, "parameters");
  const units = args.units && typeof args.units === "object" && !Array.isArray(args.units) ? args.units : {};
  const lengthUnit = units.D ?? "mm";
  const forceUnit = units.P ?? "kN";
  const angleUnit = units.alpha ?? "deg";
  const stressUnit = units.stress ?? "MPa";
  const input = {
    D: convertUnit(num(parameters, "D"), LENGTH_SCALE, lengthUnit, "D"),
    P: convertUnit(num(parameters, "P"), FORCE_SCALE, forceUnit, "P"),
    alpha: convertUnit(num(parameters, "alpha"), ANGLE_SCALE, angleUnit, "alpha"),
    sigma3: convertUnit(num(parameters, "sigma3", false), STRESS_SCALE, stressUnit, "sigma3")
  };
  if (problemType === "confined" && !input.sigma3) {
    throw new ToolInputError("confined \u9898\u578B\u9700\u8981 sigma3 \u5927\u4E8E 0", {
      code: "MISSING_SIGMA3",
      example: { D: 50, P: 49.09, alpha: 60, sigma3: 10 }
    });
  }
  const student = parseStudent(object(args, "student"));
  for (const field of ["Rc", "c", "sigmaN", "tau", "tauF", "sigma1"]) {
    const value = student[field];
    if (value !== void 0) {
      student[field] = convertUnit(value, STRESS_SCALE, stressUnit, field);
    }
  }
  if (student.phi !== void 0) {
    student.phi = convertUnit(student.phi, ANGLE_SCALE, angleUnit, "phi");
  }
  let result;
  try {
    result = diagnoseUniaxialError(input, student);
  } catch (err) {
    const message = err instanceof Error ? err.message : "\u8BCA\u65AD\u5931\u8D25";
    const code = /α|alpha/.test(message) ? "INVALID_ANGLE" : /直径|D/.test(message) ? "INVALID_DIAMETER" : /荷载|P/.test(message) ? "INVALID_LOAD" : "INVALID_PARAMETER";
    throw new ToolInputError(message, {
      code,
      example: { D: 50, P: 49.09, alpha: 60 },
      studentExample: { Rc: 25, phi: 30, c: 14.43, sigmaN: 6.25, tau: 10.83, tauF: 18.04, sigma1: 25 }
    });
  }
  const tolerance = args.tolerance && typeof args.tolerance === "object" && !Array.isArray(args.tolerance) ? args.tolerance : {};
  const relTolerance = typeof tolerance.rel === "number" ? tolerance.rel : 0.05;
  const status = statusOf(result);
  const audit = buildStepAudit(result, student, relTolerance);
  return {
    ok: true,
    status,
    card: buildCard(status, result, audit),
    candidates: compactCandidates(result),
    standard: result.correct,
    step_audit: audit,
    assumptions: [
      "alpha \u662F\u7834\u574F\u9762\u4E0E\u6700\u5927\u4E3B\u5E94\u529B\u5E73\u9762\u7684\u5939\u89D2",
      "\u5E94\u529B\u5355\u4F4D MPa\uFF0C\u957F\u5EA6 mm\uFF0C\u8377\u8F7D kN"
    ],
    source: "rock://formulas"
  };
}
function generateVariantsTool(args) {
  const target = args.target_error;
  if (typeof target !== "string") {
    throw new ToolInputError("\u7F3A\u5C11 target_error", {
      code: "MISSING_TARGET_ERROR",
      available: ERROR_MODELS.map((model) => model.code)
    });
  }
  const count = Math.min(3, Math.max(1, Number(args.count ?? 3) || 3));
  const audience = args.audience === "teacher" ? "teacher" : "student";
  let base;
  if (args.base !== void 0) {
    const raw = object(args, "base");
    base = {
      D: num(raw, "D"),
      P: num(raw, "P"),
      alpha: num(raw, "alpha"),
      sigma3: num(raw, "sigma3", false)
    };
  }
  let variants;
  try {
    variants = generateVariants({ targetError: target, count, base });
  } catch (err) {
    throw new ToolInputError(err instanceof Error ? err.message : "\u751F\u6210\u5931\u8D25", {
      code: "UNSUPPORTED_TARGET_ERROR",
      target_error: target,
      available: ERROR_MODELS.map((model) => model.code)
    });
  }
  if (audience === "student") {
    return {
      audience,
      variants: variants.map((variant) => ({
        id: variant.id,
        problem_text: variant.problemText,
        parameters: variant.parameters,
        hint: variant.hint
      }))
    };
  }
  return {
    audience,
    target_error: target,
    variants: variants.map((variant) => ({
      id: variant.id,
      problem_text: variant.problemText,
      parameters: variant.parameters,
      standard: variant.standard,
      trap: variant.trap,
      target_error: variant.targetError,
      target_error_label: variant.targetErrorLabel,
      hint: variant.hint,
      validation: {
        solver: "solve_uniaxial_mohr_coulomb",
        discrimination: "pass"
      }
    }))
  };
}
function classErrorReport(args) {
  const rawCases = args.cases;
  if (!Array.isArray(rawCases) || rawCases.length === 0) {
    throw new ToolInputError("cases \u4E0D\u80FD\u4E3A\u7A7A", {
      code: "EMPTY_CASES",
      example: [
        {
          id: "S01",
          D: 50,
          P: 49.09,
          alpha: 60,
          sigma3: 0,
          student: { phi: 30, c: 14.43, sigmaN: 6.25, tau: 10.83, tauF: 18.04, sigma1: 25 }
        }
      ]
    });
  }
  if (rawCases.length > MAX_CASES) {
    throw new ToolInputError(`cases \u6700\u591A ${MAX_CASES} \u6761`, {
      code: "TOO_MANY_CASES",
      max: MAX_CASES
    });
  }
  const topN = Math.min(5, Math.max(1, Number(args.top_n ?? 5) || 5));
  const reports = [];
  const invalid = [];
  rawCases.forEach((item, index) => {
    const id = typeof item?.id === "string" ? item.id : `S${String(index + 1).padStart(2, "0")}`;
    try {
      const row = item;
      const studentRaw = row.student;
      if (typeof studentRaw !== "object" || studentRaw === null || Array.isArray(studentRaw)) {
        throw new Error("student \u5FC5\u987B\u662F\u5BF9\u8C61");
      }
      const input = {
        D: num(row, "D"),
        P: num(row, "P"),
        alpha: num(row, "alpha"),
        sigma3: num(row, "sigma3", false)
      };
      const student = parseStudent(studentRaw);
      const result = diagnoseUniaxialError(input, student);
      const status = statusOf(result);
      const top = result.candidates[0];
      reports.push({
        id,
        status,
        topCode: top?.code ?? null,
        topLabel: top?.label ?? null,
        confidence: top?.confidence ?? 0,
        standard: result.correct,
        student,
        primaryField: top ? PRIMARY_FIELD2[top.code] : void 0
      });
    } catch (err) {
      invalid.push({ id, reason: err instanceof Error ? err.message : "\u65E0\u6548\u7528\u4F8B" });
    }
  });
  const total = rawCases.length;
  const correct = reports.filter((report) => report.status === "correct").length;
  const unknown = reports.filter(
    (report) => report.status === "insufficient_evidence" || report.status === "unknown"
  ).length;
  const diagnosed = reports.filter(
    (report) => report.status === "diagnosed" || report.status === "ambiguous"
  );
  const groups = /* @__PURE__ */ new Map();
  for (const report of diagnosed) {
    const code = report.topCode;
    const entry = groups.get(code) ?? {
      code,
      label: report.topLabel ?? code,
      count: 0,
      student_ids: []
    };
    entry.count += 1;
    entry.student_ids.push(report.id);
    if (!entry.representative && report.primaryField) {
      const field = report.primaryField;
      const studentValue = report.student[field];
      const expectedValue = report.standard[field];
      entry.representative = {
        id: report.id,
        student_value: `${field}=${studentValue ?? "?"}`,
        expected_value: `${field}=${Number(expectedValue).toFixed(4)}`,
        note: report.status === "ambiguous" ? "\u5B58\u5728\u7B49\u4EF7\u5019\u9009\uFF0C\u9700\u8FFD\u95EE" : void 0
      };
    }
    groups.set(code, entry);
  }
  const distribution = [...groups.values()].sort((a, b) => b.count - a.count).slice(0, topN).map((group) => ({
    ...group,
    pct: Math.round(group.count / Math.max(1, total) * 100)
  }));
  const teaching_actions = distribution.slice(0, 3).map((group, index) => ({
    priority: index + 1,
    target_code: group.code,
    focus: `\u5148\u8BB2\u201C${group.label}\u201D\uFF0C\u8986\u76D6 ${group.count}/${total} \u4EFD\u9519\u7B54`,
    suggested_demo_action: `\u8C03\u7528 generate_variants(target_error="${group.code}", audience="teacher", count=1) \u751F\u6210\u8BFE\u5802\u4F8B\u9898`
  }));
  return {
    meta: {
      total,
      correct_count: correct,
      pass_rate_pct: Math.round(correct / Math.max(1, total) * 100),
      diagnosed_error_count: diagnosed.length,
      unknown_count: unknown,
      invalid_count: invalid.length,
      counting_basis: "primary_root_error_per_student"
    },
    distribution,
    manual_review_needed: {
      unknown_ids: reports.filter(
        (report) => report.status === "insufficient_evidence" || report.status === "unknown"
      ).map((report) => report.id),
      invalid_cases: invalid
    },
    teaching_actions,
    citations: ["rock://formulas"]
  };
}
function computeRockMechanics(args) {
  const topic = args.topic;
  if (typeof topic !== "string") {
    throw new ToolInputError("\u7F3A\u5C11 topic", {
      code: "MISSING_TOPIC",
      available: Object.keys(COMPUTE_TOPICS)
    });
  }
  const def = COMPUTE_TOPICS[topic];
  if (!def) {
    throw new ToolInputError(`\u672A\u77E5 topic\uFF1A${topic}`, {
      code: "UNKNOWN_TOPIC",
      available: Object.keys(COMPUTE_TOPICS),
      examples: Object.fromEntries(
        Object.entries(COMPUTE_TOPICS).map(([key, value]) => [key, value.example])
      )
    });
  }
  const parameters = object(args, "parameters");
  const missing = def.required.filter((key) => parameters[key] === void 0);
  if (missing.length > 0) {
    throw new ToolInputError(`\u7F3A\u5C11\u53C2\u6570\uFF1A${missing.join(", ")}`, {
      code: "MISSING_PARAMETER",
      topic,
      required: def.required,
      example: def.example
    });
  }
  try {
    return callTool(def.tool, parameters);
  } catch (err) {
    if (err instanceof ToolInputError) throw err;
    throw new ToolInputError(err instanceof Error ? err.message : "\u8BA1\u7B97\u5931\u8D25", {
      code: "INVALID_PARAMETER",
      topic,
      required: def.required,
      example: def.example
    });
  }
}
function callTool(name, args) {
  switch (name) {
    case "solve_uniaxial_mohr_coulomb":
      return solveUniaxialMohrCoulomb({
        D: num(args, "D"),
        P: num(args, "P"),
        alpha: num(args, "alpha"),
        sigma3: num(args, "sigma3", false)
      });
    case "mohr_coulomb_sigma1":
      return {
        sigma1: mohrCoulombSigma1({
          c: num(args, "c"),
          phi: num(args, "phi"),
          sigma3: num(args, "sigma3")
        })
      };
    case "mohr_coulomb_fs":
      return {
        fs: mohrCoulombFS(
          num(args, "c"),
          num(args, "phi"),
          num(args, "sigma1"),
          num(args, "sigma3")
        )
      };
    case "hoek_brown_sigma1":
      return {
        sigma1: hoekBrownSigma1({
          sigmaCi: num(args, "sigmaCi"),
          gsi: num(args, "gsi"),
          mi: num(args, "mi"),
          D: num(args, "D", false),
          sigma3: num(args, "sigma3")
        })
      };
    case "rqd":
      return { rqd: rqd(runs(args)) };
    case "infinite_slope_fs":
      return {
        fs: infiniteSlopeFS({
          c: num(args, "c"),
          phi: num(args, "phi"),
          gamma: num(args, "gamma"),
          z: num(args, "z"),
          beta: num(args, "beta"),
          u: num(args, "u", false)
        })
      };
    case "plane_stress":
      return planeStress(
        num(args, "sigma1"),
        num(args, "sigma3"),
        num(args, "theta")
      );
    case "shear_strength":
      return {
        tauF: shearStrength(num(args, "c"), num(args, "phi"), num(args, "sigma"))
      };
    case "diagnose_uniaxial_error":
      return diagnoseUniaxialError(
        {
          D: num(args, "D"),
          P: num(args, "P"),
          alpha: num(args, "alpha"),
          sigma3: num(args, "sigma3", false)
        },
        studentAnswers(args)
      );
    case "fit_mohr_coulomb_from_triaxial":
      return fitMohrCoulombFromTriaxial(triaxialPoints(args));
    case "insitu_stress":
      return insituStress({
        gamma: num(args, "gamma"),
        H: num(args, "H"),
        nu: args.nu === void 0 ? void 0 : num(args, "nu"),
        lambda: args.lambda === void 0 ? void 0 : num(args, "lambda")
      });
    case "kirsch_stress":
      return kirsch({
        sigmaH: num(args, "sigmaH"),
        sigmaV: num(args, "sigmaV"),
        a: num(args, "a"),
        r: num(args, "r"),
        theta: num(args, "theta")
      });
    case "rmr89":
      return rmr89({
        ucs: num(args, "ucs"),
        rqd: num(args, "rqd"),
        spacing: num(args, "spacing"),
        condition: num(args, "condition"),
        water: num(args, "water"),
        orientation: num(args, "orientation", false)
      });
    case "gsi_from_rmr":
      return { gsi: gsiFromRmr(num(args, "rmr")) };
    case "planar_wedge_fs":
      return {
        fs: planarWedgeFS({
          H: num(args, "H"),
          beta: num(args, "beta"),
          alpha: num(args, "alpha"),
          gamma: num(args, "gamma"),
          c: num(args, "c"),
          phi: num(args, "phi"),
          u: num(args, "u", false)
        })
      };
    case "stress_transform_2d":
      return stressTransform2D({
        sigmaX: num(args, "sigmaX"),
        sigmaY: num(args, "sigmaY"),
        tauXY: num(args, "tauXY"),
        theta: num(args, "theta")
      });
    case "diagnose_batch":
      return { items: diagnoseBatch(batchCases(args)) };
    case "diagnose_submission":
      return diagnoseSubmission(args);
    case "generate_variants":
      return generateVariantsTool(args);
    case "class_error_report":
      return classErrorReport(args);
    case "compute_rock_mechanics":
      return computeRockMechanics(args);
    default:
      throw new Error(`\u672A\u77E5\u5DE5\u5177\uFF1A${name}`);
  }
}

// src/mcp/rpc.ts
var PROTOCOL_VERSION = "2025-06-18";
var SUPPORTED_VERSIONS = ["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25"];
function invalidParams(id, message, data) {
  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32602, message, ...data === void 0 ? {} : { data } }
  };
}
function handleRpc(req, profile = "agent") {
  const id = req.id ?? null;
  const tools = toolsForProfile(profile);
  if (req.id === void 0) return null;
  if (req.jsonrpc !== "2.0") {
    return { jsonrpc: "2.0", id, error: { code: -32600, message: "Invalid Request" } };
  }
  switch (req.method) {
    case "initialize": {
      const requested = typeof req.params?.protocolVersion === "string" ? req.params.protocolVersion : PROTOCOL_VERSION;
      const protocolVersion = SUPPORTED_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSION;
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion,
          capabilities: {
            tools: { listChanged: false },
            resources: { listChanged: false, subscribe: false },
            prompts: { listChanged: false }
          },
          serverInfo: {
            name: "rock-mechanics",
            title: "\u5CA9\u8BCA \xB7 \u5CA9\u77F3\u529B\u5B66\u8BA4\u77E5\u8BCA\u65AD",
            version: "0.2.1"
          },
          instructions: "\u5CA9\u77F3\u529B\u5B66\u53EF\u9A8C\u8BC1\u8BCA\u65AD\u670D\u52A1\uFF1A\u8BA1\u7B97\u8D70\u7B26\u53F7\u6C42\u89E3\u5668\uFF0C\u9519\u56E0\u7528\u9519\u8BEF\u6A21\u578B\u53CD\u7B97\uFF1B\u4E0D\u8981\u53E3\u7B97\u3002"
        }
      };
    }
    case "ping":
    case "logging/setLevel":
      return { jsonrpc: "2.0", id, result: {} };
    case "tools/list":
      return { jsonrpc: "2.0", id, result: { tools } };
    case "resources/list":
      return { jsonrpc: "2.0", id, result: { resources: listResources() } };
    case "resources/read": {
      const uri = req.params?.uri;
      if (typeof uri !== "string") {
        return invalidParams(id, "resources/read \u7F3A\u5C11 uri");
      }
      try {
        return { jsonrpc: "2.0", id, result: readResource(uri) };
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          return {
            jsonrpc: "2.0",
            id,
            error: { code: -32002, message: err.message, data: { uri } }
          };
        }
        return {
          jsonrpc: "2.0",
          id,
          error: { code: -32603, message: "\u8BFB\u53D6\u8D44\u6E90\u5931\u8D25" }
        };
      }
    }
    case "prompts/list":
      return { jsonrpc: "2.0", id, result: { prompts: PROMPTS } };
    case "prompts/get": {
      const name = req.params?.name;
      if (typeof name !== "string") {
        return invalidParams(id, "prompts/get \u7F3A\u5C11 name");
      }
      const prompt = PROMPTS.find((p) => p.name === name);
      if (!prompt) {
        return invalidParams(id, `\u672A\u77E5 prompt\uFF1A${name}`, {
          available: PROMPTS.map((p) => p.name)
        });
      }
      const rawArgs = req.params?.arguments;
      const args = rawArgs && typeof rawArgs === "object" && !Array.isArray(rawArgs) ? rawArgs : {};
      const missing = prompt.arguments.filter((arg) => arg.required && !args[arg.name]).map((arg) => arg.name);
      if (missing.length > 0) {
        return invalidParams(id, `\u7F3A\u5C11\u5FC5\u586B\u53C2\u6570\uFF1A${missing.join(", ")}`, {
          prompt: name,
          missing
        });
      }
      try {
        return { jsonrpc: "2.0", id, result: getPrompt(name, args) };
      } catch (err) {
        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32603,
            message: err instanceof Error ? err.message : "\u83B7\u53D6 prompt \u5931\u8D25"
          }
        };
      }
    }
    case "tools/call": {
      const params = req.params ?? {};
      const name = params.name;
      const args = params.arguments ?? {};
      if (typeof name !== "string") {
        return invalidParams(id, "tools/call \u7F3A\u5C11 name");
      }
      const tool = tools.find((t) => t.name === name);
      if (!tool) {
        return invalidParams(id, `Unknown tool: ${name}`, {
          available: tools.map((t) => t.name)
        });
      }
      const required = tool.inputSchema.required ?? [];
      const missing = required.filter((key) => args[key] === void 0);
      if (missing.length > 0) {
        return invalidParams(id, `\u7F3A\u5C11\u5FC5\u586B\u53C2\u6570\uFF1A${missing.join(", ")}`, {
          tool: name,
          missing
        });
      }
      try {
        const result = callTool(name, args);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            structuredContent: result,
            isError: false
          }
        };
      } catch (err) {
        if (err instanceof ToolInputError) {
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    { ok: false, error: { message: err.message, ...err.data } },
                    null,
                    2
                  )
                }
              ],
              isError: true
            }
          };
        }
        const message = err instanceof Error ? err.message : "\u5DE5\u5177\u6267\u884C\u5931\u8D25";
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `\u5DE5\u5177\u6267\u884C\u5931\u8D25\uFF1A${message}\u3002\u8BF7\u68C0\u67E5\u53C2\u6570\u5355\u4F4D\u4E0E\u53D6\u503C\u8303\u56F4\uFF1B\u53C2\u6570\u793A\u4F8B\u89C1 tools/list \u7684 inputSchema\u3002`
              }
            ],
            isError: true
          }
        };
      }
    }
    default:
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${req.method}` }
      };
  }
}

// src/mcp/stdio.ts
var PROFILE = process.env.MCP_TOOL_PROFILE === "full" ? "full" : "agent";
var buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let index = buffer.indexOf("\n");
  while (index >= 0) {
    const line = buffer.slice(0, index).trim();
    buffer = buffer.slice(index + 1);
    index = buffer.indexOf("\n");
    if (!line) continue;
    try {
      const request = JSON.parse(line);
      const response = handleRpc(request, PROFILE);
      if (response) process.stdout.write(`${JSON.stringify(response)}
`);
    } catch {
      process.stdout.write(
        `${JSON.stringify({
          jsonrpc: "2.0",
          id: null,
          error: { code: -32700, message: "Parse error" }
        })}
`
      );
    }
  }
});
process.stdin.on("end", () => process.exit(0));
