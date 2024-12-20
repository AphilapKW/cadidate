import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidatesEntity } from 'src/database/default/entity/candidate.entity';
import { ChangeLogEntity } from 'src/database/default/entity/change-log.entity';
import { CommentEntity } from 'src/database/default/entity/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(CandidatesEntity)
    private readonly candidatesRepository: Repository<CandidatesEntity>,
    @InjectRepository(ChangeLogEntity)
    private readonly changeLogRepository: Repository<ChangeLogEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createOrUpdateCandidate(
    existingCandidate: CandidatesEntity,
    candidateData: Partial<CandidatesEntity>,
  ): Promise<CandidatesEntity> {
    let action = 'create';
    let candidate: CandidatesEntity;

    if (existingCandidate && candidateData?.id) {
      candidate = this.candidatesRepository.merge(
        existingCandidate,
        candidateData,
      );
      action = 'update';
    } else {
      candidate = this.candidatesRepository.create(candidateData);
    }

    const savedCandidate = await this.candidatesRepository.save(candidate);

    const changeLog = this.changeLogRepository.create({
      action,
      title: savedCandidate.title,
      description: savedCandidate.description,
      status: savedCandidate.status,
      user: candidate.user,
      candidates: candidate,
    });
    await this.changeLogRepository.save(changeLog);

    return savedCandidate;
  }

  async findCandidateAll(): Promise<CandidatesEntity[]> {
    return await this.candidatesRepository.find({
      where: { isSaved: false },
      relations: { user: true },
    });
  }

  async findCandidateById(id: string): Promise<CandidatesEntity> {
    return await this.candidatesRepository.findOne({ where: { id } });
  }

  async findCandidateDetail(id: string): Promise<CandidatesEntity> {
    return await this.candidatesRepository.findOne({
      where: { id },
      relations: { comment: { user: true }, changeLogs: true, user: true },
    });
  }

  async createOrUpdateComment(
    existingComment: CommentEntity,
    commentData: Partial<CommentEntity>,
  ): Promise<CommentEntity> {
    let comment: CommentEntity;

    if (existingComment && commentData?.id) {
      comment = this.commentRepository.merge(existingComment, commentData);
    } else {
      comment = this.commentRepository.create(commentData);
    }

    return await this.commentRepository.save(comment);
  }

  async findCommentById(id: string): Promise<CommentEntity> {
    return await this.commentRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async softDeleteComment(id: string) {
    await this.commentRepository.softDelete(id);
  }
}
