package com.example.backend.services;

import com.example.backend.models.MultipleChoiceQuiz;
import com.example.backend.models.play.PlayMultipleChoiceQuestion;
import com.example.backend.models.play.PlayMultipleChoiceQuiz;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class MultipleChoiceMappingService {

    private final AuthenticationService authService;

    public PlayMultipleChoiceQuiz mapMultipleChoiceQuizToPlayMcq(MultipleChoiceQuiz mcq) {

        List<PlayMultipleChoiceQuestion> pmcqList = mcq.multipleChoiceQuestions()
                .stream().map(mcQuestion -> {
                            List<String> answers = new ArrayList<>();
                            answers.add(mcQuestion.trueAnswer());
                            answers.addAll(mcQuestion.falseAnswers());
                            Collections.shuffle(answers);

                            return PlayMultipleChoiceQuestion.builder()
                                    .question(mcQuestion.question())
                                    .answers(answers)
                                    .build();
                        }
                ).toList();

        return PlayMultipleChoiceQuiz.builder()
                .id(mcq.id())
                .author(mcq.author())
                .name(mcq.name())
                .numberOfQuestions(mcq.numberOfQuestions())
                .playMultipleChoiceQuestions(pmcqList)
                .build();
    }

    public MultipleChoiceQuiz addAuthorToMultipleChoiceQuiz(MultipleChoiceQuiz mcq) {
        return MultipleChoiceQuiz.builder()
                .author(authService.getAuthor())
                .name(mcq.name())
                .numberOfQuestions(mcq.numberOfQuestions())
                .multipleChoiceQuestions(mcq.multipleChoiceQuestions())
                .build();
    }
}
