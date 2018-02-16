import { createThunks } from '../../../utils/CoreModule';
import { ExportEntry } from './types';

const {
  createRow: createExportEntry,
  updateRow: updateExportEntry,
} = createThunks<ExportEntry>('export');

export default {
  createExportEntry,
  updateExportEntry,
};
