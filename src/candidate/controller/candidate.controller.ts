import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CandidateService } from '../service/candidate.service';
import { JwtAuthGuard } from 'src/shared/guard/auth.guard';
import { CandidatesEntity } from 'src/database/default/entity/candidate.entity';
import { UsersService } from 'src/users/service/users.service';
import { CommentEntity } from 'src/database/default/entity/comment.entity';

@Controller('candidate')
@UseGuards(JwtAuthGuard)
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createOrUpdate(
    @Req() req,
    @Body() candidateData: Partial<CandidatesEntity>,
  ) {
    const userId = req.user.sub;
    let existingCandidate: CandidatesEntity;
    if (candidateData.id) {
      existingCandidate = await this.candidateService.findCandidateById(
        candidateData.id,
      );
      if (!existingCandidate) {
        throw new NotFoundException('Candidate not found');
      }
    }
    candidateData.user = await this.usersService.findOneById(userId);
    return await this.candidateService.createOrUpdateCandidate(
      existingCandidate,
      candidateData,
    );
  }

  @Get()
  async getCandidateAll() {
    return await this.candidateService.findCandidateAll();
  }

  @Post(':candidateId/comment')
  async createOrUpdateComment(
    @Param('candidateId') candidateId: string,
    @Req() req,
    @Body() commentData: Partial<CommentEntity>,
  ) {
    let existingComment: CommentEntity;
    const userId = req.user.sub;
    if (commentData?.id) {
      existingComment = await this.candidateService.findCommentById(
        commentData?.id,
      );
      console.log(userId);
      console.log(existingComment);
      if (!existingComment) {
        throw new NotFoundException('Comment not found');
      }

      if (userId !== existingComment?.user?.id) {
        throw new BadRequestException(
          'User does not have permission in this comment',
        );
      }
    }

    if (!commentData?.id) {
      commentData.user = await this.usersService.findOneById(userId);
      commentData.candidates =
        await this.candidateService.findCandidateById(candidateId);
      if (!commentData?.candidates) {
        throw new NotFoundException('Candidate not found');
      }
    }

    return await this.candidateService.createOrUpdateComment(
      existingComment,
      commentData,
    );
  }

  @Get(':candidateId/detail')
  async getCandidateDetail(@Param('candidateId') candidateId: string) {
    return await this.candidateService.findCandidateDetail(candidateId);
  }

  @Delete('comment/:commentId')
  async deleteComment(@Param('commentId') commentId: string, @Req() req) {
    const existingComment =
      await this.candidateService.findCommentById(commentId);
    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }

    const userId = req.user.sub;
    if (userId !== existingComment.user.id) {
      throw new BadRequestException(
        'User does not have permission in this comment',
      );
    }

    await this.candidateService.softDeleteComment(commentId);
  }
}
