interface IMessage {
  ruleId: string;
  severity: number;
  line: number;
  column: number;
}

interface IScanData {
  filePath: string;
  warningCount: number;
  messages: IMessage[];
}

interface IAnalyzeData {
  filePath: string;
  messages: IMessage[];
}

interface IClones {
  duplicationA: IDuplication;
  duplicationB: IDuplication;
}

interface IDuplication {
  sourceId: string;
  start: {
    line: number;
    column: number;
  };
  end: {
    line: number;
    column: number;
  };
}

interface IRepetitionRule {
  minTokens: number;
  minLines: number;
  maxLines: number;
}

interface IRange {
  line: number;
  column: number;
}

interface ICodeRepetitionData {
  fileA: {
    filePath: string;
    codeRange: IRange[];
  };
  fileB: {
    filePath: string;
    codeRange: IRange[];
  };
}
