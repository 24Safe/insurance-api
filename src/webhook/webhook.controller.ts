import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { DocumentsUploadDto, StatusChangedDto } from './webhook.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  @Post('status')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Receive status change notifications (webhook)',
    description: `This endpoint is designed to receive incoming webhook requests whenever a status change occurs in the system.
      It processes and records the change for further handling, auditing, or workflow automation.
      Typically used by external services or internal systems to push status updates in real-time.`,
  })
  public async statusChanged(@Body() body: StatusChangedDto) {
    console.log(body);
    return { message: 'Success' };
  }

  @Post('documents')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Receive labeled documents (webhook)',
    description: `This endpoint receives multiple documents along with their associated labels.
  It is designed to handle incoming document uploads (e.g., PDFs, images, etc.) and store or process them based on the provided metadata.
    ***Example curl***:
    \`\`\`
    curl -X POST http://localhost:3000/webhook/documents \
        -F "files=@/path/to/file" \
        -F "metadata[0][name]=Contract A" \
        -F "metadata[0][type]=OTHER"
    \`\`\`
  `,
  })
  @FormDataRequest({ storage: FileSystemStoredFile })
  public async documentsUpload(@Body() body: DocumentsUploadDto) {
    console.log(body);
    return { message: 'Success' };
  }
}
