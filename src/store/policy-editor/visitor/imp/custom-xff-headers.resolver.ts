import { BaseVisitor } from "../interface/base.visitor";
import { FieldResolverVisitor } from "../interface/field-resolver.visitor";
import { PolicyEditorDispatch } from "../../policy-editor.types";
import { GridFieldValue } from "../../../../component/policy-editor/controls/grid-field-value.type";
import { LabelFieldControl } from "../../../../component/policy-editor/controls/field-control/label.field-control";
import { TextEditFieldControl } from "../../../../component/policy-editor/controls/field-control/text-edit.field-control";
import { policyEditorJsonVisit } from "../../policy-editor.actions";
import { get as _get, set as _set, unset as _unset } from "lodash";

export class CustomXffHeadersResolver
  extends BaseVisitor
  implements FieldResolverVisitor
{
  constructor(
    public rowIndex: number,
    protected dispatch: PolicyEditorDispatch,
    protected json: any
  ) {
    super(dispatch, json);
  }

  key(): string {
    return this.json;
  }

  get hasAdvancedRows(): boolean {
    return false;
  }

  getAdvancedRows(): GridFieldValue[] {
    return [];
  }

  get basePath(): string {
    return "general.customXffHeaders";
  }

  getBasicRows(): GridFieldValue[] {
    return [
      {
        title: "",
        errorPath: [`instance.${this.basePath}[${this.rowIndex}]`],
        controlInfo:
          this.rowIndex === -1
            ? new LabelFieldControl(this.json)
            : new TextEditFieldControl(
                this.json,
                (text) =>
                  this.dispatch(
                    policyEditorJsonVisit((currentJson) => {
                      _set(
                        currentJson,
                        `policy.${this.basePath}[${this.rowIndex}]`,
                        text
                      );
                    })
                  ),
                {},
                { variant: "outlined", size: "small" }
              ),
      },
    ];
  }

  remove(): void {
    this.dispatch(
      policyEditorJsonVisit((currentJson) => {
        _get(currentJson, `policy.${this.basePath}`).splice(this.rowIndex, 1);
        if (_get(currentJson, `policy.${this.basePath}`).length === 0) {
          _unset(currentJson, `policy.${this.basePath}`);
        }
      })
    );
  }
}