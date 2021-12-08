import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Injectable()
export class CustomAdapter extends NgbDateAdapter<Date> {

  readonly DELIMITER = '-';

  fromModel(value: Date | null): NgbDateStruct | null {
    if (value) {
      return {
        day : value.getDate(),
        month : value.getMonth()+1,
        year : value.getFullYear()
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): Date | null {
    return date ? moment(date.year + this.DELIMITER + date.month + this.DELIMITER + date.day).toDate() : null;
  }
}
